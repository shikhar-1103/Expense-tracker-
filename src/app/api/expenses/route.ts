import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idempotencyKey, amount, category, description, date } = body;

    if (!idempotencyKey || typeof amount !== 'number' || !category || !description || !date) {
      return NextResponse.json({ error: 'Missing required fields or invalid data types' }, { status: 400 });
    }

    if (amount <= 0) {
      return NextResponse.json({ error: 'Amount must be positive' }, { status: 400 });
    }

    // Handle Idempotency
    const existingExpense = await prisma.expense.findUnique({
      where: { idempotencyKey },
    });

    if (existingExpense) {
      return NextResponse.json(existingExpense, { status: 200 }); 
    }

    const newExpense = await prisma.expense.create({
      data: {
        idempotencyKey,
        amount,
        category,
        description,
        date: new Date(date),
      },
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');

    // default newest first
    let orderBy: any = { date: 'desc' }; 
    
    if (sort === 'date_asc') {
      orderBy = { date: 'asc' };
    } else if (sort === 'date_desc') {
      orderBy = { date: 'desc' };
    }

    const where = category ? { category } : {};

    const expenses = await prisma.expense.findMany({
      where,
      orderBy,
    });

    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
