import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Register from './components/Register';
import Username from './components/Username';
import Password from './components/Password';
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import ProtectedRoute from './HOC/ProtectedRoute';
import RequireAuth from './HOC/RequireAuth';

// ?: Root routes
const router = createBrowserRouter([
	{ path: '/', element: <Username /> },
	{ path: '/register', element: <Register /> },
	{
		path: '/password',
		element: (
			<ProtectedRoute>
				<Password />
			</ProtectedRoute>
		),
	},
	{
		path: '/profile',
		element: (
			<RequireAuth>
				<Profile />
			</RequireAuth>
		),
	},
	{ path: '/reset', element: <Reset /> },
	{ path: '/recovery', element: <Recovery /> },
	{ path: '*', element: <PageNotFound /> },
]);

function App() {
	return (
		<main>
			<RouterProvider router={router} />
		</main>
	);
}

export default App;
