import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Initial base count
const INITIAL_COUNT = 0;

const dataDir = path.join(process.cwd(), '.data');
const filePath = path.join(dataDir, 'coffee.json');

function getCount(): number {
  try {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (typeof data.count === 'number') {
        return data.count;
      }
    }
  } catch (err) {
    console.error('Error reading coffee count:', err);
  }
  return INITIAL_COUNT;
}

function saveCount(count: number) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify({ count, updatedAt: new Date().toISOString() }), 'utf8');
  } catch (err) {
    console.error('Error saving coffee count:', err);
  }
}

export async function GET() {
  const count = getCount();
  return NextResponse.json({ count });
}

export async function POST() {
  let count = getCount();
  count += 1;
  saveCount(count);
  return NextResponse.json({ count });
}
