import { NextResponse } from 'next/server'

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.TWELVE_API_KEY,
        'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
    }
};

export async function POST(request) {
    const params = await request.json()

    const url = `https://twelve-data1.p.rapidapi.com/quote?symbol=${params.prompt}&outputsize=30&format=json&interval=1day`;
    const response = await fetch(url, options);
    const result = await response.text();

    return NextResponse.json(result)

}
