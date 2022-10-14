import type {NextApiRequest, NextApiResponse} from 'next'
import {get_list, createOne} from "../../../server/tasks";

type Data = {
    name: string
    body: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method?.toLowerCase()) {
        case 'post':
            const taskData = JSON.parse(req.body);
            const data = await createOne(taskData);
            res.status(200).json({name: '생성기능', body: data})
            break;
        case 'get':
            const tasks = await get_list()
            res.status(200).json(tasks)
            break;
    }
}

// 생성 = POST /tasks
// 리스트 읽기 = GET /tasks