This a simple React app for Patient Health Questionnaire (PHQ-9)

This easy to use patient questionnaire is a self-administered version of the PRIME-MD diagnostic instrument for common mental disorders. The PHQ-9 is the depression module, which scores each of the nine DSM-IV criteria as "0" (not at all) to "3" (nearly every day). It has been validated for use in primary care. 

It is not a screening tool for depression but it is used to monitor the severity of depression and response to treatment. However, it can be used to make a tentative diagnosis of depression in at-risk populations - eg, those with coronary heart disease or after stroke. 

When screening for depression the Patient Health Questionnaire (PHQ-2) can be used first (it has a 97% sensitivity and a 67% specificity). If this is positive, the PHQ-9 can then be used, which has 61% sensitivity and 94% specificity in adults.

After finishing the questionnaire, you will be assessed a Depression Severity. If moderate or greater, you will be recommended 3 therapists to go to.

To run this app, simply type in python -m SimpleHTTPServer in the terminal. Unless serving on another port, visit http://localhost:8000/ to check out the app.

Notes:
Desktop - this should be working on most browsers but I have only tested on Chrome

Mobile
-this has only been applied to iPhone/iPad/iPod
-this has only been tested/optimized for iPhone6S (through chrome dev tool simulation)
-due to lack of space, after submission, I remove the table (of questions/answers) and score
-will need to add a button to get back to the form

Last thoughts
-this is just a front-end app (view layer of mvc)
-i would eventually break up each react class into its separate file
-i'm importing all of the react files from cdns, so you won't need to run npm or gulp
-sass/less would greatly help, but i wanted to just do the barebones/basics of react