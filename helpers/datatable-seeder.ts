import type { ContainerJourney } from "~/types/containers"

export const journeySeeder = (rows: number) => {
    const data = [] as ContainerJourney[];
    for (let i = 1; i <= rows; i++) {
        data.push({
            id: i,
            carga: Math.floor(Math.random() * 100),
            type: Math.floor(Math.random() * 10),
            progress: Math.floor(Math.random() * 100),
            status: "In Transit",
            userIsPresent: Math.random() > 0.5,
            closeDate: new Date().toISOString(),
            shipDate: new Date().toISOString(),
            arrivalDate: new Date().toISOString(),
            deliveryDate: new Date().toISOString(),
            qtyBox: Math.floor(Math.random() * 100),
            cbm: Math.floor(Math.random() * 100),
            fob: Math.floor(Math.random() * 100),
            logistic: Math.floor(Math.random() * 100),
            tax: Math.floor(Math.random() * 100),
            seekingUuid: `uuid-${i}`,
        });
    }
    return data;
}