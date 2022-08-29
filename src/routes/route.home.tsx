import Layout from '../shared/Layout'
import DriveRoute from '../routes/route.drive'
import LocationRoute from '../routes/route.location'
import { Path } from '../shared/models/path.type'

export default {
    path: '/',
    element: <Layout />,
    children: [
        DriveRoute,
        // LocationRoute
    ]
} as Path