#!/bin/bash
# Bash Menu Script Example
PS3='Please enter your choice: '
options=`ls src`
options+=('Quit')
select opt in "${options[@]}"
do
    case $opt in
        "Quit")
            break
            ;;
        *)
            budo src/"$opt"/bundle.js --dir src/"$opt"/ --live -- -t babelify
        npm start
            ;;
    esac
done
