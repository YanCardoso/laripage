import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";

function Home() {
	const [showImage, setShowImage] = useState(false);
	const [buttonPosition, setButtonPosition] = useState({
		top: "initial",
		left: "initial",
	});
	const [isMoved, setIsMoved] = useState(false);
	const audioRef = useRef(null);

	function getRandomPosition() {
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Subtraímos um valor para evitar que o botão saia completamente da tela
		const top = Math.random() * (viewportHeight - 50); // 50px de margem
		const left = Math.random() * (viewportWidth - 100); // 100px de margem

		return { top: `${top}px`, left: `${left}px` };
	}

	function handleNoClick() {
		const newPosition = getRandomPosition();
		setButtonPosition(newPosition);
	}

	function handleNoClick() {
		if (!isMoved) {
			setIsMoved(true); // Marca que o botão foi movido
		}
		const newPosition = getRandomPosition();
		setButtonPosition(newPosition);
	}

	function resetButtonPosition() {
		setButtonPosition({ top: "initial", left: "initial" });
		setIsMoved(false); // Reseta o estado de movimento
	}

	function handleClick() {
		setShowImage(() => true);
	}

	function closeModal() {
		resetButtonPosition();
		setShowImage(false);
	}

	useEffect(() => {
		if (showImage && typeof window !== "undefined") {
			if (audioRef.current) {
				audioRef.current.play(); // Toca o áudio quando o modal abre
			}

			if ("vibrate" in navigator) {
				navigator.vibrate([
					1100, 200, 1100, 200, 1200, 1100, 200, 1100, 200, 1200, 1100, 200,
					1100, 200, 1200, 1100, 200, 1100, 200, 1200,
				]); // Vibração personalizada
			}
		} else {
			if (audioRef.current) {
				audioRef.current.pause(); // Pausa o áudio quando o modal fecha
				audioRef.current.currentTime = 0; // Reseta o áudio para o início
			}
		}
	}, [showImage]);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.centeredBox}>
					<h1>Você me ama?</h1>
					<div className={styles.boxButtons}>
						<button className={styles.button} onClick={handleClick}>
							Sim
						</button>
						<button
							className={styles.button}
							style={{
								position: isMoved ? "absolute" : "static", // Absoluto apenas se movido
								...buttonPosition,
							}}
							onClick={handleNoClick}
						>
							Não
						</button>
					</div>
				</div>
			</div>
			{showImage && (
				<div className={styles.modal} onClick={closeModal}>
					<div className={styles.modalContent}>
						<img src='/lari_img.png' alt='Imagem' className={styles.image} />
						<div className={styles.newsTicker}>
							<h1>TE AMO &#x1F970;&#x1F970;&#x1F970; TE AMO &#x1F970;&#x1F970;&#x1F970; TE AMO &#x1F970;&#x1F970;&#x1F970; TE AMO &#x1F970;&#x1F970;&#x1F970;</h1>
						</div>
					</div>
				</div>
			)}
			<audio ref={audioRef} src='/miaw_song.mp3' />
		</>
	);
}

export default Home;
