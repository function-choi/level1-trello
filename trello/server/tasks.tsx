import mysql from "mysql";

const createConnect = (): Promise<mysql.Connection> => new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
        host: "woohyeok-db.cporwsgg6jvd.ap-northeast-2.rds.amazonaws.com", //Endpoint
        port: 3306,
        user: "root",
        password: "thdnjs1!",
        database: "trello",
    });
    connection.connect((err) => {
        if (err) reject(err);
        resolve(connection);
    });
})

const query = (connection: mysql.Connection, sql: Parameters<mysql.QueryFunction>[0], data: Parameters<mysql.QueryFunction>[1]): Promise<any> => new Promise((resolve, reject) => {
    connection.query(sql, data, (err, result) => {
        if (err) reject(err);
        resolve(result);
    });
});

export async function get_list() {
    const connection = await createConnect();
    const result = await query(connection, 'SELECT * FROM tasks', {});
    connection.destroy();
    const transformed = result.map((item: any) => ({
        title: item.title,
        description: item.description,
        id: item.id,
        section: item.section,
        priority: item.priority
    }));
    console.log(transformed);
    return transformed;
};

function transform(item: any) {
    return {
        title: item.title,
        description: item.description,
        id: item.id,
        section: item.section,
        priority: item.priority
    };
}

export async function getOne(id: number) {
    const connection = await createConnect();
    const result = await query(connection, `SELECT *
                                            FROM tasks
                                            WHERE id = ${id}`, {});
    connection.destroy();
    const transformed = result.map(transform);
    console.log(transformed);
    return transformed[0];
}

export async function createOne(taskData: any) {
    const connection = await createConnect();
    const result = await query(connection, `
        INSERT INTO tasks (title, description, section, priority)
        VALUES ('${taskData.title}', '${taskData.description}', '${taskData.section}', 0);`, {})
    connection.destroy();
    const created = await getOne(result.insertId);
    return created;
}

export async function deleteOne(id:number){
    const connection = await createConnect();
    const result = await query(connection, `DELETE FROM tasks 
                                            WHERE id = ${id}`, {});
    connection.destroy();
    const transformed = result.map(transform);
    return transform;
}

export async function putOne(taskData:any){
    const connection = await createConnect();
    const result = await query(connection, `UPDATE tasks SET title = '${taskData.title}', description = '${taskData.description}' where id = ${taskData.id};`, {});
    connection.destroy();
    const edited = await getOne(result.taskData.id);
    return edited;
}