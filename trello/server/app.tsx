import mysql from 'mysql';

// const CREATE_DATABASE = 'CREATE DATABASE trello'
// const SHOW_DATABASES = 'SHOW DATABASES'
// const CREATE_TABLE = 'CREATE TABLE tasks
//                 (
//                     id int auto_increment primary key,
//                     title varchar(50),
//                     description varchar(200),
//                     section int,
//                     priority int
//                 );'
// const SHOW_TABLES = 'SHOW TABLES';
// const INSERT_INTO = 'INSERT INTO tasks(title,description, section, priority) VALUES ('Title', 'Description',0,0);'
// const UPDATE = 'UPDATE tasks SET title = 'title' where id = 1;'
// const DELETE = 'DELETE FROM tasks WHERE id = 1;'

function main() {
    const connection = mysql.createConnection({
        host: "woohyeok-db.cporwsgg6jvd.ap-northeast-2.rds.amazonaws.com", //Endpoint
        port: 3306,
        user: "root",
        password: "thdnjs1!",
        database: "trello",
    });
    connection.connect((err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('mysql is connected');
        const query = connection.query(`
            INSERT INTO tasks(title, description, section, priority)
            VALUES ('Title2', 'Description2', 0, 0);
        `);
        query.on('result', (row) => {
            console.log('databases', row);
        })
        // process.exit(1);
    });
}

main();