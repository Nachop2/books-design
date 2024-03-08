import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const RefreshLocation = () => {
    const { pathname } = useLocation();
    const prevPathname = useRef("");

    useEffect(() => {
        if (pathname !== prevPathname.current) {
            window.location.reload();
            prevPathname.current = pathname; // Actualizar la ruta anterior
        }
    }, [pathname]);

    return null; // "RefreshLocation" es un componente de utilidad, por lo que no tiene que renderizar nada
};

export default RefreshLocation;