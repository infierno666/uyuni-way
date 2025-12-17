import Hero from '../components/sections/Hero';
import Discover from '../components/sections/Discover'; // <-- IMPORTAR AQUÍ
import InfoGrid from '../components/sections/InfoGrid';
import ToursList from '../components/sections/ToursList';

const Home = () => {
    return (
        <>
            <Hero />
            <Discover /> {/* <-- AGREGARLO AQUÍ (Debajo del Hero) */}
            <InfoGrid />
            <ToursList />
        </>
    );
};

export default Home;