import React from "react";
import style from "./About.module.css";
import html from '../../media/htmlicon.png'
import css from '../../media/cssicon.png'
import react from '../../media/reacticon.png'
import redux from '../../media/reduxicon.png'
import node from '../../media/nodeicon.png'
import express from '../../media/expressicon.png'
import seq from '../../media/seqicon.png'
import post from '../../media/posticon.png'




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
          </div>
        </div>
      </div>
    </div>
  );
}
