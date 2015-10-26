# TODO

**Note:** This file is for organizing the changes that need to be made in order
for this app to work. The main problem is that Bluemix Watson doesn't work
anymore for us (big surprise), so we need to use something like HP Haven. 
We also need to decide whether we will continue using a web app or try to make
a phone app. This file includes no hardware plans.

***

Regardless, here are changes that need to be made (feel free to edit):

    1. Delete all the IBM from this repo so that we have no constraints and no
    copyright issues. There is a reason I called this branch 'noWatson'. (I am
    in the process of doing this now, after I 'clean' this branch of irrelevant
    material I will merge it with the master branch.)
    
    2. Get rid of the MongoDB part of this app. I have done some research and 
    MongoDB seems very well suited for dealing with JSON material, which most of
    the speech-to-text software I have found produces, but since we are interested
    in storing words and not JSON documents, we probably have no need for this.
    
    3. Decide whether we want a web app or a phone app (I would choose Android > iOS)
    
    4. Perhaps implement an SQL server, I say perhaps because this is not as 
    important as making the app run.
    
    5. Work on the parsing regex
    
    6. Add features, such as expiration dates, reminders, output to shopping list,
    etc, etc, etc.
    
\*by George
