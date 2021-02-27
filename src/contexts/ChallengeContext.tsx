import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'

interface Challenge {
    type: 'bode' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentexperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentexperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

     useEffect(()=>{
         Notification.requestPermission()
     },[])

    const [activeChallenge, setActiveChallenge] = useState(null)
    function levelUp() {
        setLevel(level + 1)
    }
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission ==='granted'){
            new Notification('Novo desafio ',{
                body: `Valendo ${challenge.amount}xp!`
            })
        }
     }
    function resetChallenge() {
        setActiveChallenge(null)
    }
    function completeChallenge() {
        if (!activeChallenge) {
            return
        }
        const { amount } = activeChallenge
        let finalExperience = currentexperience + amount
        if (finalExperience >= experienceToNextLevel) {
            levelUp()
            finalExperience = finalExperience - experienceToNextLevel
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)

    }
    return (

        <ChallengesContext.Provider
            value={{
                level,
                currentexperience,
                levelUp,
                challengesCompleted,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge
            }}
        >

            {children}


        </ChallengesContext.Provider>
    )
}