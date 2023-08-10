'use client'

import { Card } from "antd";

function UserById({params}) {


    return (
        <Card className="m-2">
            Backend API has not yet been provided!
            <p>User ID by params: {params.id}</p>
        </Card>
    );
}

export default UserById;