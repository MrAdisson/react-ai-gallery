import "./Home.css";

import MasonryGallery from "@/components/MasonryGallery/MasonryGallery";

const Home = () => {
  return (
    <div className="Home">
      <header className="App-header">
        <h2>Explore the world's best AI generated images...</h2>
      </header>
      <MasonryGallery />
    </div>
  );
};

export default Home;
