import type {NextApiRequest, NextApiResponse} from 'next'
import {deleteOne, getOne, putOne} from "../../../server/tasks";

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method?.toLowerCase()) {
        case 'put':
            const editedTask = await putOne(req.body)
            res.status(200).json(editedTask)
            break;
        case 'delete':
            const deletedTask = await deleteOne(Number(req.query.id));
            res.status(200).json(deletedTask)
            break;
        case 'get':
            const getTask = await getOne(Number(req.query.id));
            res.status(200).json(getTask)
            break;
    }
}

// 수정하기 = PUT /tasks/[id]
// 삭제하기 = DELETE /tasks/[id]
// 하나만 읽기 = GET /tasks/[id]
