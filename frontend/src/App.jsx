import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Register from './components/Register';
import Username from './components/Username';
import Password from './components/Password';
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';

// ?: Root routes
const router = createBrowserRouter([
	{ path: '/', element: <Username /> },
	{ path: '/register', element: <Register /> },
	{ path: '/password', element: <Password /> },
	{ path: '/profile', element: <Profile /> },
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
