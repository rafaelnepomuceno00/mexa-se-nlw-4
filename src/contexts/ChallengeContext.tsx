import { createContext, ReactNode, useState } from 'react'
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

    const [activeChallenge, setActiveChallenge] = useState(null)
    function levelUp() {
        setLevel(level + 1)
    }
    function startNewChallenge() {

        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

    }
    function resetChallenge() {
        setActiveChallenge(null)
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
                experienceToNextLevel
            }}
        >

            {children}


        </ChallengesContext.Provider>
    )
}