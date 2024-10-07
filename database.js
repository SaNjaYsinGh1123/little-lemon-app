import * as SQLite from "expo-sqlite";



// await db.withTransactionAsync(async () => {
//   const result = await db.getFirstAsync('SELECT COUNT(*) FROM USERS');
//   console.log('Count:', result.rows[0]['COUNT(*)']);
// });


export async function createTable() {
  const db = await SQLite.openDatabaseAsync("little_lemon_db");
  console.log("hi",db);
     const result =  await db.runAsync(
           `PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS menu (name TEXT, price TEXT, category TEXT, description TEXT, image TEXT);
            `
        );
    // console.log('result',result);
    return result;
}

export async function getMenuItems() {
  // return new Promise((resolve) => {
  //   db.transaction((tx) => {
  //     tx.executeSql("select * from menu", [], (_, { rows }) => {
  //       resolve(rows._array);
  //     });
  //   });
  // });
  const db = await SQLite.openDatabaseAsync("little_lemon_db");
  const allRows = await db.getAllAsync('SELECT * FROM menu');
  // console.log(allRows);
  for (const row of allRows) {
    console.log("row in get",row.id, row.name, row.price);
  }
  return allRows;
}

export async function saveMenuItems(menuItems) {
  const db = await SQLite.openDatabaseAsync("little_lemon_db");

    const result = await db.runAsync(
      `INSERT INTO menu (name, price, category, description, image) values ${menuItems
        .map(
          (item) =>
            `('${item.name}', '${item.price}', '${
              item.category
            }', '${item.description.replace("'", "`")}', '${item.image}')`
        )
        .join(", ")};`,
      [],
      (_, resultset) => console.log("success"),
      (_, error) => console.log("trx error", error)
    );
  console.log('result in save',result);
}


export async function deleteMenuItems() {
  const db = await SQLite.openDatabaseAsync("little_lemon_db");

    const result = await db.runAsync(
      `DELETE FROM menu`,
      [],
      (_, resultset) => console.log("success"),
      (_, error) => console.log("trx error", error)
    );
  console.log('result in delete',result);
}

export async function filterByQueryAndCategories(query, activeCategories){
    const db =await SQLite.openDatabaseAsync("little_lemon_db");
    console.log('query',query,activeCategories);
    const result = await db.getAllAsync(`SELECT * FROM menu WHERE category IN (${activeCategories.map((category)=> `'${category}'`).join(", ")}) AND name LIKE '%${query}%'`)
     
    console.log('result in filter',result.length)
    // return "db is not connected yet"
    return result
}