const prisma = new PrismaClient()

export async function getUsers() {
    return await prisma.person.findMany()
}


export async function getConnection() {
    return await prisma.connection.findMany()
}


export async function addNode() {
    try {
        const json = await request.json();

        const user = await prisma.person.create({
            data: json,
        });

        return new NextResponse(JSON.stringify(user), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        if (error.code === "P2002") {
            return new NextResponse("User with email already exists", {
                status: 409,
            });
        }
        return new NextResponse(error.message, { status: 500 });
    }
}

// app.post(`/post`, async (req, res) => {
//     const { title, content, authorEmail } = req.body
//     const result = await prisma.post.create({
//       data: {
//         title,
//         content,
//         published: false,
//         author: { connect: { email: authorEmail } },
//       },
//     })
//     res.json(result)
//   })