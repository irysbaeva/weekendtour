export default class TourService {
  data = [
    {
      card: 1,
      title: "Конжак. Главный Уральский Хребет",
      startDate: "03.02.2021",
      endDate: "03.05.2021",
      description:
        "3-6 января 2021 12 900₽ Возраст 12+ Средний уровень сложности Длина 40 км Питание включено",
      includes: "All inclusive",
        price: "3000",
      company: "Taiga"
      },
  
    {
      card: 2,
      title: "Таганай. Все вершины",
      startDate: "07.02.2021",
      endDate: "03.05.2021",
      description:
        "3-6 января 2021 12 900₽ Возраст 12+ Средний уровень сложности Длина 40 км Питание включено",
      includes: "All inclusive",
      price: "3000",
      company: "Taiga"
    },
    {
      card: 3,
      title: "Конжак. Главный Уральский Хребет",
      startDate: "09.02.2021",
      endDate: "03.05.2021",
      description:
        "3-6 января 2021 12 900₽ Возраст 12+ Средний уровень сложности Длина 40 км Питание включено",
      includes: "All inclusive",
      price: "3000",
      company: "Taiga"
    },
    {
      card: 4,
      title: "Конжак. Главный Уральский Хребет",
      startDate: "03.03.2021",
      endDate: "03.05.2021",
      description:
        "3-6 января 2021 12 900₽ Возраст 12+ Средний уровень сложности Длина 40 км Питание включено",
      includes: "All inclusive",
      price: "3000",
      company: "Good company"
    },
    {
      card: 5,
      title: "Конжак. Главный Уральский Хребет",
      startDate: "03.04.2021",
      endDate: "03.05.2021",
      description:
        "3-6 января 2021 12 900₽ Возраст 12+ Средний уровень сложности Длина 40 км Питание включено",
      includes: "All inclusive",
      price: "3000",
      company: "Taiga"
    },
    {
      card: 6,
      title: "Конжак. Главный Уральский Хребет",
      startDate: "03.02.2022",
      endDate: "03.05.2021",
      description:
        "3-6 января 2021 12 900₽ Возраст 12+ Средний уровень сложности Длина 40 км Питание включено",
      includes: "All inclusive",
      price: "3000",
      company: "Taiga"
    },
  ];

  getTours() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(this.data);
        rej(new Error("Error"));
      }, 700);
    });
  }
}
