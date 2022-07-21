import React from "react";

const About = () => {
  return (
    <div className="dark:bg-gray-700 dark:text-white lg:px-12 lg:py-20 px-6 grid lg:grid-cols-2 object-contain h-screen">
      <div className="my-auto mx-auto">
        <h1
          className="flex text-3xl font-semibold"
          style={{ fontFamily: "Amatic SC, cursive" }}
        >
          <li /> What is wumpus?
        </h1>
        <p
          className="mb-4 text-xl"
          style={{ fontFamily: "Amatic SC, cursive" }}
        >
          Wumpus is Discord's mascot, and appears in branding, easter eggs,
          stickers, and images throughout the client and website. Wumpus is used
          to wave to new users who join a server or start a Direct Message.
        </p>
        <h1
          className="flex text-3xl font-semibold"
          style={{ fontFamily: "Amatic SC, cursive" }}
        >
          <li /> Hunt the Wumpus game
        </h1>
        <p
          className="mb-4 text-xl"
          style={{ fontFamily: "Amatic SC, cursive" }}
        >
          Hunt the Wumpus is a text-based adventure game developed by Gregory
          Yob in 1973. In the game, the player moves through a series of
          connected caves, arranged as the vertices of a dodecahedron, as they
          hunt a monster named the Wumpus.
        </p>
        <h1
          className="flex text-3xl font-semibold"
          style={{ fontFamily: "Amatic SC, cursive" }}
        >
          <li />
          Why I created this website?
        </h1>
        <p
          className="mb-4 text-xl"
          style={{ fontFamily: "Amatic SC, cursive" }}
        >
          Wumpus is a virtual pet. It is used as a mascot in Discord, and is too
          much cute and adorable like virtual object. In discord wumpus has so
          many emotions which express with animation, but the animation is not
          available everywhere if you search it. This website will help you to
          find the animation and download them in .png format, .gif format, and
          .json format for lottie.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <lottie-player
          src="https://distok.top/stickers/749043879713701898/749045492352155769.json"
          background="transparent"
          speed="1"
          style={{ width: "350px", height: "350px" }}
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
  );
};

export default About;
