import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Register from './pages/Register';
import Username from './pages/Username';
import Password from './pages/Password';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import Recovery from './pages/Recovery';
import Reset from './pages/Reset';

import ProtectedRoute from './HOC/ProtectedRoute';
import RequireAuth from './HOC/RequireAuth';
import PersistLogin from './components/PersistLogin';

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
			<PersistLogin>
				<RequireAuth>
					<Profile />
				</RequireAuth>
			</PersistLogin>
		),
	},
	{
		path: '/reset',
		element: (
			<ProtectedRoute>
				<Reset />
			</ProtectedRoute>
		),
	},
	{
		path: '/recovery',
		element: (
			<ProtectedRoute>
				<Recovery />
			</ProtectedRoute>
		),
	},
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
