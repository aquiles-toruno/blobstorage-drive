import { Route, Routes } from "react-router-dom";
import { Path } from "./models/path.type";

interface AppRoutesProps {
    routes: Array<Path>
}

const RecursiveRoutes = (routes: Array<Path>) => {
    // debugger
    return routes.map((route, index) => {
        if (route.children && route.children.length > 0) {
            return <Route key={index} path={route.path} element={route.element} >
                {
                    RecursiveRoutes(route.children)
                }
            </Route>
        }

        return <Route key={index} path={route.path} element={route.element} />
    });
}

export default function AppRoutes({ routes }: AppRoutesProps) {
    return <Routes>
        {
            RecursiveRoutes(routes)
        }
    </Routes>
}