import styles from '../styles/components/Profile.module.css'
export function Profile() {
    return (
        <div className={styles.profileContainer}>

            <img src="https://github.com/rafaelnepomuceno00.png" alt='Rafael Nepomuceno' />
            <div>
                <strong>
                    Rafael Nepomuceno
            </strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Level 1
                </p>
            </div>
        </div>
    )
}