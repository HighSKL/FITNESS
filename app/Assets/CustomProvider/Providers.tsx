'use client'
import { store } from '@/app/(storage)/store';
import { Provider } from 'react-redux';


function Providers({children} : any) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default Providers;