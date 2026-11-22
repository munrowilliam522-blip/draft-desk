{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\csgray\c0;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # Draft Desk \'97 Claude Code Project Brief\
\
## Project Overview\
NFL Draft scouting report website built with Next.js, Tailwind CSS, and MDX.\
Deployed on Vercel. Repo: github.com/munrowilliam522-blip/draft-desk\
Local folder: ~/Desktop/ClaudeProject\
\
## Site Structure\
- Prospects pages organized by draft year (2026, 2025, 2024)\
- Individual player pages with stats, bio, scouting report sections\
- Blog section\
- Dark/editorial design \'97 takes cues from The Draft Network\
\
## Player Grade Scale\
\pard\tx560\tx1120\tx1680\tx2240\tx2800\tx3360\tx3920\tx4480\tx5040\tx5600\tx6160\tx6720\pardirnatural\partightenfactor0

\f1\fs22 \cf2 \CocoaLigature0 9.0+ "Top Pick", 8.4-8.9      \
  "Solid First Round", 7.8-8.3 "First or Second Round", 7.0-7.7 "Day 2 Pick", 6.0-6.9 "Day 3 Pick", 5.9-0   \
  "Undrafted"
\f0\fs24 \cf0 \CocoaLigature1 \
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0
\cf0 \
## How Reports Are Published\
Add an MDX file to content/prospects/[year]/[player-slug].mdx\
Push to GitHub \'97 Vercel auto-deploys in ~30 seconds\
\
## Apps Script Automation (Google Sheets Pipeline)\
Project name: StatAutomation\
Project ID: 12NYwMqQyeE7TJoG3FO244lrkIUcVL3IzV-F2Jpxk4AGC9vuYaA2Wi2GJ\
URL: https://script.google.com/u/0/home/projects/...\
\
Code is always injected via Monaco API:\
window.monaco.editor.getEditors()[0].getModel().setValue(newCode);\
\
Save: click floppy disk icon (~378, 83). Then select runAll from dropdown and click Run.\
\
Escape inch marks inside JS strings: 6'2\\" not 6'2"\
\
## Completed Work\
- Website created on Vercel and pushed to domain\
\
## Folder IDs \
- QB folder: https://drive.google.com/drive/folders/1lTQj55lSwwa4wFqjXV7rjCsf1yiBXB2A\
}