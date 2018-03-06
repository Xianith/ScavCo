# Scav Co
Escape from Tarkov website for all your EFT needs. Links out to many guides and resources but I am working on trying to house everything in one area while providing unique tools that people can use.

**Written in:** [React](https://reactjs.org/)

**Current Version: 0.1.0**

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](
https://www.paypal.me/xianith)

---

## Currently working on:

* Data Sorting

* Start messing around with the Google Maps API

* Finish up the imaging for bartering categories

* Finish up ammo types

* Crossover data from several sources and notate which is "Offical" and which is community related

---

## Planned:

* Search barter page by categories as well as traders (Categories from in game / will use same imaging)

* Trade login to post trades on site as well as automatically to the trade sub reddit

* Discord integiraiton for trades / meet ups

* Api pull from multiple discords that have trade channels and post them on site (maybe have the login post there as well eventually)

* News page with latest patch notes

* Maps that are clean but have styling per user (shareable styles) similar to DayZ maps and the sorts

* Additional tools (brought over from other devs or simply linked to)

---

## Finished

*0.0.9*

    * Eventually put this somewhere for people to see
        --https://redd.it/82ag20

    * Finish cleaning up naviagtion and unify it
        --Still needs work but is in a much better state

*0.0.8*

    * Worked on ScavBot Discord integiration
    
    * Notated which trades are related to discord
    
    * Obtained discord tag through regex
    
    * Restructured file system

*0.0.7*

    * Fix up the mobile view because it's terrible

*0.0.6*

     * Redo Posts js
       * Should contain itslef in a "Trading Tab"
       * WTS, WTB and WTT are sub page navigation options
       * Tidbit at the bottom to inform where this data is coming from
       -- Created trading.js to house all this.

*0.0.5*

      * Clean up CSS and make it not look bad. Re-create style from EFT website perhaps? 
            -- Copied subreddit styling (which is similar to websites)
      
      * Figure out why Font's are weird. 
            -- Fixed in Webpack config

*0.0.4*

      * Need to reactify the pages that handle the GoogleAPI stuff (ammo.html and barter.html)

          * barter complete, need to work on ammo

