#!/bin/bash
# Bash Menu Script Example
PS3='Please choose your component: '
options=($(ls -d src/*/ | sed -E 's/src\///'))
options+=('Quit')
select opt in "${options[@]}"
do
    case $opt in
        "Quit")
            break
            ;;
        *)
            budo src/"$opt"bundle.js --dir src/"$opt" --live -- -t babelify &
            /usr/bin/webpack --watch &
            ;;
    esac
done
