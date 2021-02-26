import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/ExperienceBar.module.css'
export function ExperienceBar() {
    const { currentexperience, experienceToNextLevel } = useContext(ChallengesContext)

    const percentToNextlevel = Math.round(currentexperience * 100) / experienceToNextLevel

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextlevel}%` }}></div>

                <span className={styles.currentExperience} style={{ left: `${percentToNextlevel}%` }}>
                    {currentexperience} px</span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}

//#rumoaoproximonivels