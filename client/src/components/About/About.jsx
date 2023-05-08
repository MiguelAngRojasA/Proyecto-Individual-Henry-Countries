import React from "react";
import style from "./About.module.css";
import html from "../../media/htmlicon.png";
import css from "../../media/cssicon.png";
import react from "../../media/reacticon.png";
import redux from "../../media/reduxicon.png";
import node from "../../media/nodeicon.png";
import express from "../../media/expressicon.png";
import seq from "../../media/seqicon.png";
import post from "../../media/posticon.png";
import linkedin from "../../media/linkedin.png";
import github from "../../media/GitHub.png";


export default function About() {
  return (
    <div className={`${style.container} ${style.backgroundImage}`}>
      <div className={style.container}>
        <div className={style.aboutcontainer}>
          <div className={style.title}>
            <h2>Individual Project for SoyHenry's bootcamp</h2>
          </div>
          <div className={style.space}> </div>
          <div className={style.divsection}>
            <h2>📌 OBJECTIVES 📌</h2>
            <li>
              Build a Single Page Application using React, Redux, Node, Express
              and Sequelize technologies.
            </li>
            <li>
              Put into practice basic styling and design resources (UX : UI).
            </li>
            <li>Reinforce and connect the concepts learned in the course.</li>
            <li>Learn best practices.</li>
            <li>Learn and practice GIT workflow.</li>
            <li>Use and practice testing.</li>

            <h2>🛠️ Technologies Used 🛠️</h2>
            <div className={style.tecnologiesContainer}>
              <div></div>
              <div className={style.iconContainer}>
                <img src={html} alt="htmlicon" />
                <h3>HTML5</h3>
              </div>
              <div className={style.iconContainer}>
                <img src={css} alt="cssicon" />
                <h3>CSS3</h3>
              </div>
              <div className={style.iconContainer}>
                <img src={react} alt="reacticon" />
                <h3>React</h3>
              </div>
              <div className={style.iconContainer}>
                <img src={redux} alt="reduxicon" />
                <h3>Redux</h3>
              </div>
              <div className={style.iconContainerlargue}>
                <img src={node} alt="nodeicon" />
                <h3>NodeJS</h3>
              </div>
              <div className={style.iconContainerlargue}>
                <img src={express} alt="expressicon" />
                <h3>ExpressJS</h3>
              </div>
              <div className={style.iconContainer}>
                <img src={seq} alt="seqicon" />
                <h3>Sequelize</h3>
              </div>
              <div className={style.iconContainer}>
                <img src={post} alt="posticon" />
                <h3>PostgreSQL</h3>
              </div>
            </div>
            <h2>👨‍🏫 About me 👨‍🏫</h2>
            <h4>
              As an Industrial Engineer and junior programmer, I
              bring a positive attitude, eagerness to learn, and self-taught
              skills. I have a good character, discipline, sense of belonging,
              ethical commitment, and sense of responsibility. I'm skilled in
              teamwork, building personal relationships, and problem-solving and I
              have a willingness to acquire more knowledge to be able to perform
              an excellent professional work.
            </h4>
            <div className={style.imgagesContainer}>
              <div className={style.imgContainer}>
              <a href="https://www.linkedin.com/in/miguel-angel-rojas-aroca-674695b3/">
              <img className={style.imgagenetwork} src={linkedin} alt="clinkedinicon" />
              </a> 
            </div>
            <div className={style.imgContainergit}>
              <a href="https://github.com/MiguelAngRojasA">
            <img className={style.imgagenetwork} src={github} alt="clinkedinicon"  />
           </a> 
           </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
