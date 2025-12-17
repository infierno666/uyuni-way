import Hero from '../components/sections/Hero';
import Discover from '../components/sections/Discover';
import InfoGrid from '../components/sections/InfoGrid';
import ToursList from '../components/sections/ToursList';

const Home = () => {
    return (
        <>
            <Hero />
            <Discover /> 
            <InfoGrid />
            <ToursList />
        </>
    );
};

export default Home;