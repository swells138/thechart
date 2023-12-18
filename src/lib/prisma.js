import { PrismaClient } from '@prisma/client'

const prisma = global.prisma = new PrismaClient()

async function create(event) {
    "use server"
    var nameValue = event.get("name");
    var lastNameValue = event.get("last");
    var emailValue = event.get("email")
    var colorValue = event.get("color");
    var ageValue = event.get("age");
    var cityValue = event.get("city");
    var stateValue = event.get("state");

    // Create a new user
    const newUser = await prisma.person.create({
        data: {
            firstName: nameValue,
            lastName: lastNameValue,
            email: emailValue,
            color: colorValue,
            age: ageValue,
            city: cityValue,
            state: stateValue
        }
    });

    // Connect the new user to an existing user with the given ID
    await prisma.connection.create({
        data: {
            personOneDetails: {
                connect: { id: newUser.id }
            },
            personTwoDetails: {
                connect: { id: 2 }
            }
        },
    });
}

// async function createConnection(event) {
//     const inputValueOne = event.get("personOne");
//     const inputValueTwo = event.get("personTwo");

//     // Query the database to find personOne and personTwo based on names
//     const personOne = await prisma.person.findFirst({
//         where: {
//             firstName: inputValueOne,
//         },
//     });

//     const personTwo = await prisma.person.findFirst({
//         where: {
//             firstName: inputValueTwo,
//         },
//     });

//     // Check if both persons were found
//     if (!personOne || !personTwo) {
//         throw new Error("Invalid person names provided");
//     }

//     // Create the connection using the retrieved person IDs and correct format
//     await prisma.connection.create({
//         data: {
//             personOneDetails: {
//                 connect: { id: personOne.id }
//             },
//             personTwoDetails: {
//                 connect: { id: personTwo.id }
//             }
//         },
//     });
// }

if (process.env.NODE_ENV === 'development') global.prisma = prisma

module.exports = {
    create, prisma
}