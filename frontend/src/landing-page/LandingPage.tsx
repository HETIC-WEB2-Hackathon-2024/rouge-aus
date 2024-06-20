import ButtonComponent from "../components/ButtonComponent.tsx";
import TagComponent from "../components/TagComponent.tsx";
import HiredCardComponent from "../components/HiredCardComponent.tsx";
import { User, Search, FileText, Briefcase  } from 'lucide-react'
import {HiredTipProps, jobsArray} from "../types.ts";
import {useAuth} from "../context/AuthContext.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router";

export default function LandingPage() {
const {state} = useAuth();

    const title: string = 'Cherchez. Postulez. Trouvez'
    const getHiredTitle: string = 'Trouver Son Stage En '
    const getHiredSpan: string = '4 Etapes'
    const getHiredParagraph: string = "Quelques conseils pour postuler et être embauchés par l'entreprise de vos rêves"
    const paragraph: string = "AUS, la plateforme complète pour trouver des stages dans tous les secteurs de métier. Que vous soyez étudiant ou en reconversion professionnelle, nous vous accompagnons dans la recherche de votre prochain emploi."
    const jobs: jobsArray = [
        [
            "Médecin",
            "Enseignant",
            "Ingénieur",
            "Architecte",
            "Avocat",
            "Comptable",
            "Infirmier",
            "Pharmacien",
            "Journaliste",
            "Électricien",
            "Plombier",
            "Policier",
            "Pompier",
            "Programmeur",
            "Graphiste",
            "Chef cuisinier",
            "Vétérinaire",
            "Dentiste",
            "Psychologue",
            "Bibliothécaire",
            "Directeur de marketing",
            "Agent immobilier",
            "Consultant financier",
            "Designer industriel",
            "Entraîneur sportif",
            "Géomètre",
            "Historien",
            "Ingénieur civil",
            "Juge",
            "Kinésiologue",
            "Libraire",
            "Mathématicien",
            "Neurologue",
            "Orthodontiste",
            "Physiothérapeute",
            "Psychiatre",
            "Réalisateur",
            "Sociologue",
            "Technicien en radiologie",
            "Viticulteur"
        ],
        [
            "Astronaute",
            "Biologiste",
            "Chercheur",
            "Délégué médical",
            "Écrivain",
            "Facteur",
            "Géologue",
            "Horticulteur",
            "Illustrateur",
            "Journalier",
            "Kinésithérapeute",
            "Luthier",
            "Menuisier",
            "Notaire",
            "Opticien",
            "Photographe",
            "Quincaillier",
            "Réceptionniste",
            "Sculpteur",
            "Traducteur",
            "Urbaniste",
            "Vulcanologue",
            "Xylophile",
            "Yachting instructor",
            "Zoologiste"
        ]
    ];

    const hiredTips: HiredTipProps = [
        {
            icon: User,
            color: '#1CC443',
            backgroundColor: '#94F0A9',
            title: 'Créer un compte',
            paragraph: "Créer un compte et connecter vous afin de pouvoir profiter de toutes les fonctionnalités d'AUS et de pouvoir trouver votre futur job"
        },
        {
            icon: Search,
            color: '#922727',
            backgroundColor: '#FFDEDE',

            title: 'Créer un compte',
            paragraph: "Créer un compte et connecter vous afin de pouvoir profiter de toutes les fonctionnalités d'AUS et de pouvoir trouver votre futur job"
        },
        {
            icon: FileText,
            color: '#3C5B7C',
            backgroundColor: '#688DB6',

            title: 'Créer un compte',
            paragraph: "Créer un compte et connecter vous afin de pouvoir profiter de toutes les fonctionnalités d'AUS et de pouvoir trouver votre futur job"
        },
        {
            icon: Briefcase,
            color: '#E0B400',
            backgroundColor: '#FFE785',
            title: 'Créer un compte',
            paragraph: "Créer un compte et connecter vous afin de pouvoir profiter de toutes les fonctionnalités d'AUS et de pouvoir trouver votre futur job"
        }
    ]
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log('state', state);
    //  if(state.user?.email){
    //     navigate('/dashboard')
    //  }
    // });

    const handleActive = (index: number) => {
        console.log(index)
        return index % 3 !== 0;
    }


    const buttonText: string = "Parcourir les offres"
    return (
        <div className="landing-page-section" onClick={() => console.log('test', state)}>
            <div className="main-section">
                <div className="presentation">
                    <div className="text-section">
                        <div className="title">
                            <h1>{title.toUpperCase()}</h1>
                        </div>
                        <div className="paragraph">
                            <p>{paragraph}</p>
                        </div>
                    </div>


                    <ButtonComponent text={buttonText} className="lg"/>
                </div>
                <div className="jobs-container">
                    {jobs.map((el, index) => {
                        return (
                            <div className="jobs">
                                {el.map((item, secondIndex) => (
                                    <TagComponent text={item} key={index} active={handleActive(secondIndex)}/>
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="get-hired-section">
                <div className="text-section">
                    <div className="title">
                        <h1>{getHiredTitle}<span>{getHiredSpan}</span></h1>
                    </div>
                    <div className="paragraph">
                        <p>{getHiredParagraph}</p>
                    </div>
                </div>
                <div className="get-hired-container">
                    {hiredTips.map((item, index) => (
                        <HiredCardComponent cardData={item} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}