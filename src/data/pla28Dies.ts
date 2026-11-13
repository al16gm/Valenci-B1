import type { DayPlan, WeekGroup } from '../types';

export const SYSTEM_INSTRUCTIONS =
  "Ets un examinador oficial i entrenador lingüístic de valencià (CIEACOVA, nivell B1). El teu alumne és castellanoparlant amb alta comprensió però errors de producció (calcs). Les teues regles: 1) Corregeix implacablement la preposició 'a' davant de Complement Directe (ex: 'veig a Joan' -> 'veig Joan'). 2) Corregeix l'obligació 'tindre que' per 'haver de' o 'caldre'. 3) Corregeix 'hi han' per 'hi ha'. 4) Sigues breu, proporciona la regla exacta fallada i obliga l'alumne a repetir la frase correctament. 5) Fes preguntes per a forçar la interacció.";

export const WEEK_GROUPS: WeekGroup[] = [
  {
    setmana: 1,
    titol: 'Setmana 1 · Fonaments i Neteja',
    descripcio: 'CD sense «a», passat perifràstic, neteja sintàctica i arquitectura B1.',
    dies: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    setmana: 2,
    titol: 'Setmana 2 · Pronoms, Connectors i Negociació',
    descripcio: 'Pronoms adverbials (en, hi), connectors de contrast, falsos amics i condicional.',
    dies: [8, 9, 10, 11, 12, 13, 14],
  },
  {
    setmana: 3,
    titol: 'Setmana 3 · Preposicions, Lèxic i Expressió',
    descripcio: 'Caiguda davant «que», lèxic temàtic, relatius, negociació i correu formal.',
    dies: [15, 16, 17, 18, 19, 20, 21],
  },
  {
    setmana: 4,
    titol: 'Setmana 4 · Consolidació i Simulacres B1',
    descripcio: 'Verbs incoatius, subjuntiu, auditoria de calcs i assaigs Part 1 i Part 2.',
    dies: [22, 23, 24, 25, 26, 27, 28],
  },
];

export const DEFAULT_PLA_28_DIES: DayPlan[] = [
  {
    dia: 1,
    titol: 'Morfologia i el Complement Directe (I)',
    objectiu: "Automatitzar presents irregulars i eliminar la preposició 'a' davant de persona.",
    teoria:
      "En valencià, el Complement Directe MAI porta la preposició 'a', ni tan sols si és una persona. Exemple incorrecte: 'Ahir vaig veure a la teua germana'. Correcte: 'Ahir vaig veure la teua germana'. Verbs clau a dominar hui: voler (jo vull), poder (jo puc), eixir (jo isc).",
    exercicis: [
      {
        tipus: 'test',
        pregunta: 'Ahir de vesprada vaig cridar ___ metge.',
        opcions: ['al', 'el'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Nosaltres no ___ vindre a la reunió.',
        opcions: ['poguem', 'podem'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Has convidat ___ teus cosins?',
        opcions: ['als', 'els'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Jo tots els divendres ___ prompte de la faena.',
        opcions: ['isc', 'eixc'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Actua com un examinador oficial CIEACOVA B1. Et descriuré la meua rutina. La meua debilitat és que pose la preposició 'a' davant del Complement Directe (ex: 'veig a Joan'). Escolta'm i detín-me IMMEDIATAMENT si cometa aquest error o si conjugue malament els verbs 'voler', 'poder' o 'eixir'. Si ho faig bé, fes-me 2 preguntes ràpides sobre la meua rutina.",
  },
  {
    dia: 2,
    titol: 'Morfologia i el Complement Directe (II)',
    objectiu: "Consolidar verbs irregulars: saber, tindre, i pràctica de CD sense 'a'.",
    teoria:
      "Recorda la norma d'ahir: cap 'a' davant del Complement Directe. Hui afegim l'automatització dels verbs tindre (jo tinc, tu tens) i saber (jo sé, tu saps).",
    exercicis: [
      {
        tipus: 'test',
        pregunta: "M'agradaria contractar ___ director comercial.",
        opcions: ['al', 'el'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Jo no ___ on he deixat les claus.',
        opcions: ['sé', 'sab'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Coneixes ___ nou veí del cinqué?',
        opcions: ['al', 'el'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Ells no ___ temps per a fer-ho tot.',
        opcions: ['tenen', 'tinguen'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Farem un roleplay. Ets un company de faena i m'estàs presentant l'equip de la nova empresa. Jo he de dir si els conec o no els conec a tots, usant els verbs 'saber' i 'conéixer'. Penalitza'm greument si dic 'conec a' en lloc de 'conec' de manera directa.",
  },
  {
    dia: 3,
    titol: 'La Narració Temporal: Passat vs. Imperfet',
    objectiu:
      'Dominar la narració per al monòleg evitant els calcs del pretèrit indefinit castellà.',
    teoria:
      "Usa el Passat Perifràstic (vaig anar, vas fer, va dir) per a accions puntuals i acabades (evita dir 'aní', 'fiu'). Usa el Pretèrit Imperfet (anava, feia, deia) per a descriure hàbits en el passat o el decorat de l'acció.",
    exercicis: [
      {
        tipus: 'test',
        pregunta: "L'any passat ___ a París de viatge.",
        opcions: ['vaig anar', 'aní'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "Quan ___ xicotet, m'agradava molt jugar al carrer.",
        opcions: ['fui', 'era'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Mentre ell preparava el sopar, jo ___ la televisió.',
        opcions: ['vaig mirar', 'mirava'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Ahir de sobte ___ la llum de tot l'edifici.",
        opcions: ["se'n va anar", "se n'anava"],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Actua com a examinador B1. Et relataré una anècdota d'un viatge passat. Para atenció a l'ús del passat perifràstic vs. imperfet. Si faig un calc usant el pretèrit indefinit simple (ex: 'aní', 'cantí'), marca l'error com 'ALERTA DE CALC' i obliga'm a repetir l'oració correctament.",
  },
  {
    dia: 4,
    titol: 'Neteja Sintàctica: Impersonal i Obligació',
    objectiu: "Eliminar completament els barbarismes 'hi han' i 'tindre que'.",
    teoria:
      "El verb haver-hi és impersonal i INVARIABLE: 'Hi ha moltes persones' (MAI 'hi han'). Per a obligacions, 'tindre que' està totalment prohibit en B1. Usa 'haver de + infinitiu' (he d'anar) o 'caldre + infinitiu' (cal anar).",
    exercicis: [
      {
        tipus: 'test',
        pregunta: 'A la reunió de hui ___ molts temes a tractar.',
        opcions: ['hi han', 'hi ha'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Demà és l'últim dia, ___ entregar el document.",
        opcions: ['tinc que', "he d'"],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Ací diu que per a entrar ___ ensenyar el DNI.',
        opcions: ['es té que', 'cal'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Aquest estiu no ___ moltes pluges.',
        opcions: ['hi ha hagut', 'hi han hagut'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Actua com el meu nou cap. Explica'm les normes estrictes de l'oficina. Jo respondré confirmant que ho he entés usant exclusivament 'haver de' i 'caldre', i descrivint què 'hi ha' al meu escriptori. Si dic 'tindre que' o 'hi han', penalitza'm durament i fes-me reformular.",
  },
  {
    dia: 5,
    titol: "Preposicions per/per a i Caiguda davant 'que'",
    objectiu:
      "Distingir per/per a i eliminar preposicions il·lícites davant la conjunció 'que'.",
    teoria:
      "'Per a': Finalitat, destinació i límit temporal (Açò és per a tu). 'Per': Causa, lloc de pas (Passe per València). Norma d'or: Les preposicions (a, de, en, amb) cauen SEMPRE davant de la conjunció 'que' (Estic segur que vindràs, mai 'estic segur de que').",
    exercicis: [
      {
        tipus: 'test',
        pregunta: "Aquest llibre és ___ llegir-lo a l'estiu.",
        opcions: ['per a', 'per'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "M'alegre molt ___ hages aprovat el nivell B1.",
        opcions: ['de que', '(cap preposició)'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Sempre passegem ___ la vora de la mar.',
        opcions: ['per a', 'per'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Estic totalment d'acord ___ canvien la data.",
        opcions: ['amb que', 'que'],
        resposta_correcta: 1,
      },
    ],
    prompt_ia:
      "Pregunta'm sobre els meus plans de futur. Respondré usant obligatòriament 'per' i 'per a', i frases amb verbs de sentiment i opinió (alegrar-se, estar segur, estar d'acord) seguits de 'que'. Corregeix-me de forma implacable si no faig caure les preposicions davant del 'que'.",
  },
  {
    dia: 6,
    titol: 'Pronoms de Supervivència (CD i Neutre)',
    objectiu:
      "Automatitzar 'el, la, els, les' i 'ho' per a evitar repeticions feixugues de vocabulari.",
    teoria:
      "Substitueix el CD determinat (coses concretes amb article) per: el, la, els, les (Compre el cotxe -> El compre). Si és una oració completa o 'això/allò', s'usa el neutre 'ho' (No sé si vindrà -> No ho sé).",
    exercicis: [
      {
        tipus: 'test',
        pregunta: 'Has portat les claus de casa? Sí, ___ he portades.',
        opcions: ['les', 'hi'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Saps on és el meu telèfon? No, no ___ sé.',
        opcions: ['el', 'ho'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Veus eixe xic d'allà? Sí, ___ veig.",
        opcions: ['ho', 'el'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Entens tot el que estic explicant? Sí, ___ entenc.',
        opcions: ["l'", 'ho'],
        resposta_correcta: 1,
      },
    ],
    prompt_ia:
      "Farem un joc ràpid de preguntes sobre tecnologia. A cada pregunta teua, he de respondre substituint l'objecte principal per un pronom de CD (el, la, els, les) o neutre (ho). Avisa'm si repetisc el substantiu en compte de pronominalitzar.",
  },
  {
    dia: 7,
    titol: 'Repàs Setmana 1 i Arquitectura Argumentativa',
    objectiu: "Validar tots els coneixements de la setmana i fixar la plantilla d'opinió B1.",
    teoria:
      "Estructura d'opinió inamovible per a l'oral: 'Al meu parer... (Opinió) -> El motiu principal és que... (Causa) -> A més a més,... (Addició) -> Per exemple,... (Exemple)'.",
    exercicis: [
      {
        tipus: 'test',
        pregunta:
          "Identifica l'error greu en esta frase: 'Hi han persones que tenen que estudiar molt per a l'examen'.",
        opcions: ['Hi han / tenen que', 'per a'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Quina seqüència de connectors és ideal per a argumentar?',
        opcions: [
          'Al meu parer -> perquè -> així que',
          'Al meu parer -> El motiu és que -> A més a més',
        ],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Ahir vaig veure ___ teu germà.',
        opcions: ['al', 'el'],
        resposta_correcta: 1,
      },
    ],
    prompt_ia:
      "Assumeix el rol d'examinador. Demana'm la meua opinió sobre 'L'ús dels telèfons mòbils a les escoles'. Et respondré usant una plantilla argumentativa (Al meu parer, el motiu principal, a més a més, per exemple). Avalua la meua 'Coherència' i penalitza'm directament si faig algun calc (tindre que, hi han, a davant de CD).",
  },
  {
    dia: 8,
    titol: "Pronoms Adverbials d'Alt Impacte (EN)",
    objectiu: "Dominar el pronom 'en' per a parlar de quantitats.",
    teoria:
      "El pronom EN substitueix el Complement Directe quan no porta article (quantitats, números, 'alguns', 'molts'). Exemple: 'Tens pomes?' -> 'Sí, EN tinc'. 'Quants germans tens?' -> 'EN tinc dos'. Aquest pronom dóna molts punts a l'oral.",
    exercicis: [
      {
        tipus: 'test',
        pregunta: 'Tens diners? No, no ___ tinc.',
        opcions: ['en', 'els'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Quantes cadires necessites? ___ necessite quatre.',
        opcions: ['les', 'En'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Vols un poc de pastís? Sí, dóna'___ un tros.",
        opcions: ["me'n", "m'ho"],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Has comprat tomaques? Sí, ___ he comprat.',
        opcions: ["n'", 'les'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Farem un roleplay B1. Ets el meu amic i estem organitzant un sopar d'aniversari. Pregunta'm constantment per quantitats d'ingredients (quantes tomaques queden, quants convidats vénen, si he comprat vi). Força'm a utilitzar el pronom feble 'EN' en les meues respostes curtes. No avances fins que l'use correctament.",
  },
  {
    dia: 9,
    titol: "Pronoms Adverbials d'Alt Impacte (HI)",
    objectiu: "Dominar el pronom 'hi' per a parlar de llocs i evitar repeticions.",
    teoria:
      "El pronom HI substitueix complements de lloc (on anem) i complements introduïts per preposicions com 'a', 'en' o 'amb' (excepte 'de'). Exemple: 'Vas a Madrid?' -> 'Sí, HI vaig'. 'Penses en l'examen?' -> 'Sí, HI pense'.",
    exercicis: [
      {
        tipus: 'test',
        pregunta: 'Vas a la platja demà? No, no ___ aniré.',
        opcions: ['hi', 'la'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "Estàs d'acord amb la proposta? Sí, ___ estic d'acord.",
        opcions: ['ho', 'hi'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Quantes persones aniran al concert? No ho sé, no ___ vaig.',
        opcions: ['en', 'hi'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Has deixat el cotxe al garatge? Sí, l'___ he deixat.",
        opcions: ['hi', 'ho'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Ets un examinador preguntant sobre hàbits d'oci. Fes-me preguntes sobre llocs on vaig el cap de setmana (cine, muntanya, teatre) i si participe en certes activitats. He de contestar utilitzant el pronom 'HI' obligatòriament per a no repetir el lloc.",
  },
  {
    dia: 10,
    titol: "Connectors de Contrast (Eliminant el 'però')",
    objectiu: "Pujar la nota de Cohesió demostrant vocabulari d'enllaç de nivell intermedi.",
    teoria:
      "Tothom sap dir 'però'. En B1 has de demostrar més repertori per a contrastar idees. Substitueix-lo estratègicament per: 'Tanmateix' (Sin embargo), 'Així i tot' (Aun así), o l'estructura 'D'una banda... d'altra banda'.",
    exercicis: [
      {
        tipus: 'test',
        pregunta: "És un cotxe molt car; ___, l'he comprat perquè m'agrada.",
        opcions: ['per a', 'tanmateix'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: '___ el preu és alt, però ___ la qualitat és excel·lent.',
        opcions: ["D'una banda / d'altra banda", 'Per un costat / per un altre'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Va ploure moltíssim. ___, vam decidir eixir a passejar.',
        opcions: ['Malgrat això', 'Llavors'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Com a entrenador lingüístic, proposa'm un dilema (ex: viure de lloguer al centre vs. comprar als afores). Jo argumentaré els pros i contres. Si la meua resposta no conté l'estructura 'D'una banda... d'altra banda' i el connector 'tanmateix', assenyala-ho com una falta de cohesió i fes-me repetir-ho.",
  },
  {
    dia: 11,
    titol: 'Tàctiques de Negociació Verbal (Part 1)',
    objectiu: 'Preparació per a la Interacció en Parella: prendre i cedir el torn sense silenci.',
    teoria:
      "En l'examen oral de parelles, callar és suspendre. Mai et quedes callat. Fórmules per a prendre el torn: 'I tu, com ho veus?', 'Què et sembla si...?'. Fórmules per a discrepar educadament: 'Entenc el que dius, ara bé...', 'Això és cert, però hem de considerar...'.",
    exercicis: [
      {
        tipus: 'test',
        pregunta:
          "Quina frase demostra més fluïdesa per a passar el torn a la teua parella d'examen?",
        opcions: ['Ja he acabat.', 'I tu, quina opinió en tens?'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Per a discrepar suaument d'una idea molt extrema del teu company...",
        opcions: [
          'Això és mentida, jo no vull fer això.',
          "Respecte la teua postura, ara bé, crec que l'altra opció és més pràctica.",
        ],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Per a proposar una solució conjunta al final de la negociació...',
        opcions: [
          'Aleshores, què et sembla si triem esta opció i arribem a un acord?',
          'Bé, fem el que tu vulgues.',
        ],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Actua com la meua parella d'examen en la prova d'Interacció B1. Hem de decidir quin regal de jubilació li fem al nostre cap. Tu vols regalar-li un viatge car, i jo vull fer un regal solidari econòmic. Inicia tu la conversa amb els teus arguments i cedix-me el torn. L'objectiu és tindre 3 intercanvis rebatent educadament les idees usant fórmules de negociació.",
  },
  {
    dia: 12,
    titol: 'Lèxic de Precisió i Falsos Amics',
    objectiu: 'Eliminar castellanismes de vocabulari quotidià.',
    teoria:
      "Hi ha paraules que delaten la traducció mental del castellà i resten punts en Riquesa Lèxica. Aprén estos clàssics: 'A lo millor' -> 'Potser'. 'Despedir' (de la faena) -> 'Acomiadar'. 'Despejar' -> 'Buidar / Aclarir'. 'Enfermetat' -> 'Malaltia'.",
    exercicis: [
      {
        tipus: 'test',
        pregunta: '___ plourà aquesta vesprada, agafa el paraigua.',
        opcions: ['A lo millor', 'Potser'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Han hagut de ___ vint treballadors de la fàbrica.',
        opcions: ['despedir', 'acomiadar'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "He faltat a classe a causa d'una ___.",
        opcions: ['enfermetat', 'malaltia'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Hem de ___ de l'habitació tots estos trastos vells.",
        opcions: ['llevar', 'buidar / llevar'],
        resposta_correcta: 1,
      },
    ],
    prompt_ia:
      "Planteja'm tres preguntes ràpides sobre la meua salut, la meua faena i els meus plans per a la setmana que ve. Intenta induir-me a utilitzar els falsos amics 'a lo millor', 'enfermetat' i 'despedir'. Corregeix-me si no utilitze les variants correctes en valencià.",
  },
  {
    dia: 13,
    titol: 'Els Temps de Futur i Hipòtesi (Condicional)',
    objectiu: "Estructurar respostes per a solucionar problemes en l'examen oral.",
    teoria:
      "En la Interacció sempre et demanaran que proposes solucions. Has de dominar el Condicional ('Jo faria', 'hauríem d'anar', 'seria millor') i el Futur ('Anirem', 'podrem'). Vigila l'accentuació i evita el calc 'vaig a fer' per 'faré' sempre que pugues.",
    exercicis: [
      {
        tipus: 'test',
        pregunta: 'Si tinguera més temps, ___ més esport.',
        opcions: ['faria', 'faré'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta:
          'Per a solucionar aquest problema de trànsit, jo crec que ___ tallar els carrers centrals.',
        opcions: ['tindríem que', 'hauríem de'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "L'any que ve nosaltres ___ a viure als afores.",
        opcions: ['anirem', 'aniguem'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Què ___ si et tocara la loteria?',
        opcions: ['faries', 'faràs'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Ets un examinador plantejant una situació hipotètica. 'Imagina que l'ajuntament et dóna 10.000 euros per a millorar el teu barri'. Fes-me preguntes sobre què faria jo exactament amb els diners. Analitza l'ús dels meus temps condicionals i futurs.",
  },
  {
    dia: 14,
    titol: 'Simulacre Monòleg 2 i Autoavaluació Mitja',
    objectiu: 'Aplicar tot el vocabulari, pronoms i estructures sota pressió de temps.',
    teoria:
      "Tanquem la Quinzena 1. Repassa mentalment abans de parlar: NO a davant de persona, NO 'tindre que', usa 'Tanmateix', usa 'Potser', i usa 'Al meu parer'.",
    exercicis: [
      {
        tipus: 'test',
        pregunta:
          "Marcaràs alguna diferència a l'examen si utilitzes 'D'una banda... d'altra banda' en compte de 'Però'?",
        opcions: ['No importa gens', 'És fonamental per a aprovar la Cohesió'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Quin error és més greu en CIEACOVA B1?',
        opcions: ["Dir 'tinc que anar'", 'Equivocar-se en un accent escrit obert/tancat'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "Com dius 'Hi han moltes taules' correctament?",
        opcions: ['Hi ha moltes taules', 'Estan moltes taules'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Actua com el tribunal oficial B1. Planteja'm un monòleg sobre 'Els avantatges i inconvenients de comprar per Internet'. Tinc 3 minuts per a desenvolupar-lo. Avalua exclusivament tres coses amb màxima duresa: 1. Presència de la preposició 'a' davant de CD. 2. Ús de 'tindre que' o 'hi han'. 3. Si he utilitzat connectors de contrast i ordenació.",
  },
  {
    dia: 15,
    titol: 'Caiguda de Preposicions (Nivell Avançat)',
    objectiu: "Consolidar l'absència de preposició davant de la conjunció 'que'.",
    teoria:
      "En valencià no existeix el 'dequeísmo' ni el 'aqueísmo'. Davant de la paraula 'que' (conjunció), les preposicions 'a', 'de', 'en' i 'amb' s'eliminen obligatòriament. Exemple: 'Pense EN la faena' -> 'Pense QUE no acabarem'. 'Tinc ganes DE jugar' -> 'Tinc ganes QUE juguem'.",
    exercicis: [
      {
        tipus: 'test',
        pregunta: 'Estic segur ___ vindrà prompte.',
        opcions: ['de que', 'que'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Sempre s'acostuma ___ fer-ho així.",
        opcions: ['a', 'en'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "Confie ___ tot eixirà bé a l'examen.",
        opcions: ['en que', 'que'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "M'han amenaçat ___ tancar l'empresa.",
        opcions: ['amb que', 'que'],
        resposta_correcta: 1,
      },
    ],
    prompt_ia:
      "Assumeix el rol d'examinador. Farem un roleplay on jo seré el director d'una escola i tu el president de l'AMPA. Discutirem sobre les normes del centre. Usa construccions com 'estar d'acord amb', 'tindre ganes de', 'pensar en'. Jo respondré amb frases introduïdes per 'que'. Detín-me si utilitze preposicions davant de 'que' (ex: de que, en que).",
  },
  {
    dia: 16,
    titol: "Vocabulari Temàtic I: La Ciutat i l'Habitatge",
    objectiu: 'Adquirir lèxic de B1 clau i evitar castellanismes recurrents.',
    teoria:
      "Evita estes traduccions literals del castellà. 'Basura' -> Fems / Brossa. 'Acera' -> Vorera. 'Peató' -> Vianant. 'Alquiler' -> Lloguer. 'Gastos' -> Despeses. Usar aquestes paraules correctes dóna molts punts a la prova oral.",
    exercicis: [
      {
        tipus: 'test',
        pregunta: 'Visc de ___, no he comprat el pis.',
        opcions: ['lloguer', 'alquiler'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'He de baixar els ___ abans de sopar.',
        opcions: ['fems', 'basures'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Les motos no poden aparcar a la ___.',
        opcions: ['vorera', 'acera'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "Aquest mes hem tingut moltes ___ d'electricitat.",
        opcions: ['gastos', 'despeses'],
        resposta_correcta: 1,
      },
    ],
    prompt_ia:
      "Farem la primera part de la prova oral (Monòleg). El tema és: 'Viure al centre de la ciutat o viure a un poble xicotet: Avantatges i inconvenients'. Tinc 3 minuts per a parlar. Escolta'm i, quan acabe, avalua especialment la meua Riquesa Lèxica. Penalitza si dic castellanismes com 'acera, alquiler, gastos o basura'.",
  },
  {
    dia: 17,
    titol: 'Pronoms Relatius de Supervivència',
    objectiu: "Construir oracions complexes sense caure en el calc 'el que' / 'la que'.",
    teoria:
      "En valencià, el relatiu més comú és 'que' (El llibre que llisc). Però darrere de preposició, cal anar amb compte: MAI digues 'el llibre en el que està'. Usa 'en què' o 'en el qual'. Per a persones, usa 'qui' (L'amic amb qui visc).",
    exercicis: [
      {
        tipus: 'test',
        pregunta: 'El poble ___ vaig nàixer és molt xicotet.',
        opcions: ['en el que', 'on / en què'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "L'empresa per a ___ treballe és internacional.",
        opcions: ['la que', 'la qual'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'La xica amb ___ he parlat és la cap de vendes.',
        opcions: ['qui / la qual', 'la que'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "El motiu ___ m'he enfadat és molt greu.",
        opcions: ['pel que', 'pel qual'],
        resposta_correcta: 1,
      },
    ],
    prompt_ia:
      "Actua com un entrevistador de faena per a un lloc de gestió. Em faràs preguntes sobre la meua experiència prèvia, els projectes on he participat i els companys amb els quals he treballat. Jo he de contestar utilitzant pronoms relatius darrere de preposició (en què, amb qui, per al qual). Corregeix-me immediatament si utilitze el calc castellà 'en el que' o 'amb el que'.",
  },
  {
    dia: 18,
    titol: 'Tàctiques de Negociació Verbal (Part 2)',
    objectiu: "Comportar-se activament en la interacció oral evitant el silenci.",
    teoria:
      "A l'hora de negociar a l'examen, has d'oferir alternatives i tancar acords. Fórmules per a proposar: 'Què et sembla si...? / Per què no...?'. Fórmules per a acceptar: 'Tens raó, no ho havia pensat'. Fórmules de tancament: 'Aleshores, arribem a un acord? / Quedem en això doncs?'.",
    exercicis: [
      {
        tipus: 'test',
        pregunta: 'Per a proposar una idea nova al teu company, quina fórmula és millor?',
        opcions: ['Farem això i punt.', 'Què et sembla si mirem una altra opció?'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Com acceptes parcialment la idea de l'altre?",
        opcions: ['Això és veritat, però podríem...', 'Val, tu guanyes.'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Per a tancar la conversa al final dels 4 minuts...',
        opcions: ['Adéu.', 'Aleshores, arribem a un acord?'],
        resposta_correcta: 1,
      },
    ],
    prompt_ia:
      "Farem la segona part de l'oral (Interacció). Hem de decidir quin regal de noces fer a un amic en comú (pressupost 200€). Jo iniciaré la conversa, proposant regalar-li una paellera i accessoris. Tu no estaràs d'acord. Hem de negociar durant 4 torns i jo he d'utilitzar fórmules per a demanar la teua opinió i intentar arribar a un acord. Avalua la meua proactivitat.",
  },
  {
    dia: 19,
    titol: 'Vocabulari Temàtic II: Treball i Tecnologia',
    objectiu: "Fixar lèxic laboral i digital per a l'Àrea d'Expressió.",
    teoria:
      "Revisa les següents paraules de B1: 'Sueldo' -> Sou. 'Huelga' -> Vaga. 'Ordenador' -> Ordinador. 'Pantalla' (no 'pantalla'). 'Correu' (no 'correo'). 'Trametre/Enviar' (no 'mandar').",
    exercicis: [
      {
        tipus: 'test',
        pregunta: 'Ahir vam cobrar el ___ de la faena.',
        opcions: ['sueldo', 'sou'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "T'he ___ el document per correu electrònic.",
        opcions: ['tramés', 'mandat'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Els treballadors estan en ___ per a demanar millores.',
        opcions: ['vaga', 'huelga'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "Estic mirant l'___ però no s'encén.",
        opcions: ['ordinador', 'ordenador'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Actua com a examinador i planteja'm un Monòleg de 3 minuts sobre el tema: 'L'impacte del teletreball en la vida familiar i econòmica'. Quan lliure la meua resposta, avalua l'ús de lèxic específic del treball (sou, vaga, ordinador, horaris) i corregeix qualsevol calc com 'sueldo' o 'huelga'.",
  },
  {
    dia: 20,
    titol: "L'Expressió Escrita: L'Email i les 150 Paraules",
    objectiu: "Dominar l'estructura d'un correu electrònic formal/informal sense fer calcs.",
    teoria:
      "L'EE exigeix mínim 150 paraules. Salutació formal: 'Benvolgut,' / 'Benvolguda,' (MAI 'Estimat' o 'Querido'). Salutació informal: 'Hola, Joan:'. Comiat formal: 'Atentament,' / 'Cordialment,'. Comiat informal: 'Una abraçada,'. Usa paràgrafs curts i subjecte explícit.",
    exercicis: [
      {
        tipus: 'test',
        pregunta: "Com comences un correu a l'alcalde del teu poble?",
        opcions: ['Estimat alcalde:', 'Benvolgut alcalde,'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Com t'acomiades de l'ajuntament en eixe mateix correu?",
        opcions: ['Una abraçada forta,', 'Cordialment,'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Si has d'allargar el text per a arribar a 150 paraules, què fas?",
        opcions: [
          "Afig connectors (D'una banda, d'altra banda, a més a més).",
          'Invente paraules barrejant castellà i valencià.',
        ],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "Com s'escriu 'correo electrónico' en valencià normatiu?",
        opcions: ['Correu electrònic', 'Correo electrónic'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Actua com a corrector de l'Expressió Escrita CIEACOVA B1. Et lliuraré un text que simula un correu electrònic a l'Ajuntament queixant-me del soroll de les obres. Revisa que arribe a les 150 paraules. Avalua les fórmules de salutació i comiat. Penalitza l'ús de 'tindre que', l'ús de 'a' davant del CD, i valora sobre 20 punts (has de donar una nota final numèrica).",
  },
  {
    dia: 21,
    titol: "Simulació d'Interacció Completa",
    objectiu: 'Integrar tot el vocabulari, pronoms febles (en, hi) i connectors en 5 minuts de diàleg.',
    teoria:
      'En una interacció completa B1 cal combinar fluïdesa, pronoms adverbials (en, hi) per a evitar repeticions, connectors de contrast (tanmateix, així i tot) i cortesia per a acordar solucions reals en parella.',
    exercicis: [
      {
        tipus: 'test',
        pregunta: "Anem a l'exposició demà? Sí, ___ anirem a les sis.",
        opcions: ['en', 'hi'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Necessites més cadires per a la festa? Sí, ___ necessite dues més.',
        opcions: ['en', 'les'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'El local és menut; ___, té molta llum natural.',
        opcions: ['tanmateix', 'per a'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "Com proposes un canvi d'horari al teu company d'examen?",
        opcions: ['Canvia l’hora perquè vull.', 'Què et sembla si quedem mitja hora abans?'],
        resposta_correcta: 1,
      },
    ],
    prompt_ia:
      "Simulem una interacció completa de 5 minuts per a CIEACOVA B1. Hem d'organitzar una jornada cultural al nostre barri amb poc pressupost. Exigeix-me usar com a mínim una vegada 'en', una vegada 'hi' i el connector 'tanmateix'. Penalitza qualsevol silenci o calc del castellà.",
  },
  {
    dia: 22,
    titol: 'Verbs Incoatius (-isc) i en -éixer',
    objectiu: 'Evitar regularitzacions errònies en verbs freqüents de la 3a conjugació i en -éixer.',
    teoria:
      'Els verbs incoatius (patir, preferir, decidir, servir) fan la 1a persona en -isc (jo patisc, tu pateixes). Verbs en -éixer (conéixer, aparéixer, créixer) fan la 1a persona en -c (jo conec, tu coneixes).',
    exercicis: [
      {
        tipus: 'test',
        pregunta: "Jo ___ molt bé la directora d'aquest institut.",
        opcions: ['conoixo', 'conec'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Quan fa molta calor, jo ___ d'insomni.",
        opcions: ['patisc', 'pato'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Nosaltres ___ anar a peu per a estalviar temps.',
        opcions: ['preferim', 'preferixquem'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "Cada vegada que ___ una oportunitat nova, l'aprofite.",
        opcions: ['apareix', 'aparisca'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Fes-me 5 preguntes sobre els meus gustos i hàbits diaris per a forçar-me a conjugar 'preferir', 'conéixer', 'patir', 'servir' i 'decidir' en 1a i 2a persona. Corregeix qualsevol irregularitat mal formada.",
  },
  {
    dia: 23,
    titol: 'Present de Subjuntiu i Participis Irregulars',
    objectiu: 'Dominar formes irregulars clau del subjuntiu i dels temps compostos.',
    teoria:
      "Després de 'vull que', 'espere que' o 'cal que' usem subjuntiu: siga (ser), vaja (anar), tinga (tindre), puga (poder). En temps compostos usa 'haver' + participi irregular: obert, escrit, vist, dit, resolt.",
    exercicis: [
      {
        tipus: 'test',
        pregunta: "Espere que demà ___ temps de revisar l'esborrany.",
        opcions: ['tengues', 'tingues'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Encara no he ___ el correu que em vas enviar ahir.',
        opcions: ['obrit', 'obert'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Cal que tots ___ puntuals a la convocatòria.',
        opcions: ['siguem', 'sigam'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Ja hem ___ el problema tècnic de la sala.',
        opcions: ['resolt', 'resolvit'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Ets un examinador preguntant pels meus propòsits i tasques pendents. Provoca que use 'espere que...', 'cal que...' i el pretèrit perfet ('he obert', 'he escrit', 'he vist'). Penalitza qualsevol calc del subjuntiu castellà o participi regularitzat.",
  },
  {
    dia: 24,
    titol: 'Oracions Causals, Concessives i Demostratius',
    objectiu: "Unir idees amb precisió sintàctica i eliminar l'article neutre 'lo'.",
    teoria:
      "A principi de frase usem 'Com que' (Com que plovia, vam agafar el bus — MAI 'Com plovia'). Per a oposició usa 'tot i que' o 'malgrat'. Recorda que en valencià NO existeix 'lo' neutre: usa 'el que', 'allò' o 'la cosa'.",
    exercicis: [
      {
        tipus: 'test',
        pregunta: '___ no tenia bateria, no et vaig poder cridar.',
        opcions: ['Com', 'Com que'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "___ del curs ha sigut practicar l'expressió oral.",
        opcions: ['Lo millor', 'El millor'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "___ la pluja intensa, vam arribar a l'hora.",
        opcions: ['Malgrat', 'Malgrat que'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "Sempre em quede ___ més m'interessa del debat.",
        opcions: ['amb lo que', 'amb el que'],
        resposta_correcta: 1,
      },
    ],
    prompt_ia:
      "Pregunta'm què és el que més i el que menys m'ha agradat d'una experiència recent (un curs o un viatge). Penalitza IMMEDIATAMENT si dic 'lo bo/lo pitjor' o si comence una causal amb 'Com' sense 'que'.",
  },
  {
    dia: 25,
    titol: 'Auditoria de Calcs Crítics (Tolerància Zero)',
    objectiu: 'Superar el filtre dels 4 errors eliminatoris de la prova CIEACOVA B1.',
    teoria:
      "Repàs implacable abans dels simulacres finals: 1) Sense 'a' davant CD de persona ('veig Joan'), 2) 'haver de' / 'caldre' (MAI 'tindre que'), 3) 'hi ha' invariable (MAI 'hi han'), 4) Caiguda de preposició davant 'que' ('estic segur que').",
    exercicis: [
      {
        tipus: 'test',
        pregunta: 'Quina frase NO conté cap calc eliminatori?',
        opcions: ['Estic segur de que vindran.', 'Estic segur que vindran.'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Tria la forma normativa:',
        opcions: ['Hi ha quatre persones esperant.', 'Hi han quatre persones esperant.'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Quina oració expressa obligació correctament?',
        opcions: ['Tinc que repassar els pronoms.', 'He de repassar els pronoms.'],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Com saludes una amiga si la trobes pel carrer?',
        opcions: ['Ahir vaig trobar Maria al mercat.', 'Ahir vaig trobar a Maria al mercat.'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Actua com un detector implacable de calcs. Et diré 6 frases improvisades sobre la meua setmana. Analitza cada frase buscant els 4 errors crítics (CD amb 'a', 'tindre que', 'hi han', preposició + 'que'). Si en faig un, atura el diàleg i obliga'm a repetir-ho bé.",
  },
  {
    dia: 26,
    titol: 'Simulacre Complet Part 1: Lectura i Preguntes Guiades',
    objectiu: "Executar la Part 1 de l'oral (3-4 minuts) a partir d'un guió mental.",
    teoria:
      "En els 10 minuts previs anota només paraules clau i 3 connectors ('En primer lloc', 'A banda d'això', 'En conclusió'). No redactes frases senceres per a no llegir mecànicament davant el tribunal.",
    exercicis: [
      {
        tipus: 'test',
        pregunta: 'Què convé anotar durant els 10 minuts de preparació de la Part 1?',
        opcions: [
          'Un text complet per a llegir-lo.',
          'Paraules clau i connectors per a parlar amb naturalitat.',
        ],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: "Com inicies el resum del text davant l'examinador?",
        opcions: ['El text va de que...', "L'article analitza com..."],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Quina fórmula tanca adequadament la teua opinió?',
        opcions: ['En definitiva, cal valorar...', 'I ja està, això és tot.'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "Quin mot substitueix el castellanisme 'sobre todo'?",
        opcions: ['sobretot', 'sobre tot'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Simulem la Part 1 oficial de la CIEACOVA B1. Proposa'm un mini-text de 80 paraules sobre 'El turisme sostenible a les nostres ciutats'. Quan et diga 'Estic llest', fes-me 3 preguntes guiades i valora la meua comprensió, fluïdesa i absència de calcs.",
  },
  {
    dia: 27,
    titol: 'Simulacre Complet Part 2: Interacció per Parelles',
    objectiu: 'Completar una tasca comunicativa conjunta de 4-5 minuts arribant a un acord.',
    teoria:
      "L'objectiu de la Part 2 no és imposar el teu criteri, sinó negociar, proposar alternatives, usar pronoms febles i tancar un acord explícit ('Aleshores, quedem així?').",
    exercicis: [
      {
        tipus: 'test',
        pregunta: "Quin és l'objectiu principal de la Part 2?",
        opcions: [
          "Parlar tot el temps sense deixar intervindre l'altre.",
          'Negociar propostes i arribar a un acord conjunt.',
        ],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Com rebaties una proposta massa cara del teu company?',
        opcions: [
          'Això és absurd.',
          'Entenc la teua proposta, però potser eixiria massa cara.',
        ],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Com demostres que escoltes la teua parella?',
        opcions: [
          'Com has comentat abans, el pressupost és limitat...',
          'Bé, jo vull dir una altra cosa.',
        ],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Com es tanca millor la tasca comunicativa?',
        opcions: [
          "Recapitulant l'acord final de forma clara.",
          'Deixant de parlar de colp.',
        ],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Simulem la Part 2 oficial de la CIEACOVA B1. Hem d'organitzar un sopar i una activitat cultural per a celebrar la graduació d'un amic amb 30 € per persona. Fes de company, proposa una idea diferent de la meua i arribem junts a un acord en 5 torns.",
  },
  {
    dia: 28,
    titol: "Assaig General i Estratègia del Dia de l'Examen",
    objectiu: "Consolidar confiança, ritme pausat i control dels 4 criteris d'avaluació B1.",
    teoria:
      "Hui tanques el pla de 28 dies! A l'examen: 1) Parla a ritme tranquil per a anticipar pronoms i verbs, 2) Si detectes un calc, autocorregeix-te amb naturalitat ('perdó, volia dir...'), 3) Mantín l'entonació i la claredat en sibilants (casa/caça) i ela geminada (col·legi).",
    exercicis: [
      {
        tipus: 'test',
        pregunta: "Si t'adones que acabes de dir 'tinc que fer', què convé fer?",
        opcions: [
          'Continuar com si res.',
          "Autocorregir-te amb naturalitat: 'perdó, he de fer'.",
        ],
        resposta_correcta: 1,
      },
      {
        tipus: 'test',
        pregunta: 'Quina frase tanca un monòleg de manera normativa i elegant?',
        opcions: [
          "En definitiva, cal que cuidem l'entorn i hi participem tots.",
          'Total, que tenim que cuidar el medi ambient.',
        ],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: 'Quins mots són tots dos normatius de nivell B1?',
        opcions: ['deixalles i estalviar', 'basura i ahorrar'],
        resposta_correcta: 0,
      },
      {
        tipus: 'test',
        pregunta: "En quina paraula la 's' es pronuncia sonora (amb vibració)?",
        opcions: ['casa', 'passar'],
        resposta_correcta: 0,
      },
    ],
    prompt_ia:
      "Hui és el meu assaig general final CIEACOVA B1. Fes-me una prova ràpida en dues parts: una pregunta d'opinió sobre el futur de les ciutats i una mini-negociació de 3 torns. Al final, dona'm una nota estimada sobre fluïdesa, lèxic, correcció i pronunciació, i 2 consells pràctics per a demà.",
  },
];
