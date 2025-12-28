import React from 'react';

function About() {
  return (
    <section className="py-5 bg-barber-dark">
      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-lg-6">
            <h2 className="h3 text-light text-uppercase mb-3">
              The Story of Anas Barbershop
            </h2>
            <p className="text-light-75">
              Anas Barbershop was created with one idea: give men in Bekaa a
              place where they feel at home while getting a clean, professional
              cut. No rush, no attitude – just good music, sharp tools and a
              barber that cares.
            </p>
            <p className="text-light-75">
              Anas has years of experience working with all hair types and
              styles – from classic gentleman cuts to modern fades and
              textured looks. Every cut is personalized based on your face
              shape, lifestyle and what you actually like to wear.
            </p>
            <p className="text-light-75 mb-0">
              Drop by for a haircut, beard trim or just to say salam. You&apos;re
              always welcome in the chair.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="about-image-wrapper shadow-lg">
              <img
                src="https://images.pexels.com/photos/3998395/pexels-photo-3998395.jpeg?cs=srgb&dl=pexels-cottonbro-3998395.jpg&fm=jpg"
                alt="Barber working on a client"
                className="img-fluid rounded-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
