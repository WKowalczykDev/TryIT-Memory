import A from './images/card_back/A.png';
import B from './images/card_back/B.png';
import C from './images/card_back/C.png';
import D from './images/card_back/D.png';
import E from './images/card_back/E.png';
import F from './images/card_back/F.png';
import G from './images/card_back/G.png';
import H from './images/card_back/H.png';
import I from './images/card_back/I.png';
import J from './images/card_back/J.png';
import K from './images/card_back/K.png';
import L from './images/card_back/L.png';
import M from './images/card_back/M.png';
import N from './images/card_back/N.png';
import O from './images/card_back/O.png';
import P from './images/card_back/P.png';
import Q from './images/card_back/Q.png';
import R from './images/card_back/R.png';
import S from './images/card_back/S.png';
import T from './images/card_back/T.png';
import front from './images/card_front/front.png';


// definiujemy kolory w obiekcie, aby łatwiej było nimi zarządzać
const c = {
    yellow: '#fad50a',
    red: '#f2433a',
    green: '#8ebf04',
    purple: '#7b3d72',
    orange: '#f78d0f'
};

// mapowanie liter na kolory
export const colorMap: Record<string, string> = {
    'A': c.yellow,
    'B': c.red,
    'C': c.green,
    'D': c.purple,
    'E': c.yellow,
    'F': c.red,
    'G': c.green,
    'H': c.orange,
    'I': c.yellow,
    'J': c.red,
    'K': c.green,
    'L': c.purple,
    'M': c.yellow,
    'N': c.red,
    'O': c.green,
    'P': c.orange,
    'Q': c.red,
    'R': c.green,
    'S': c.red,
    'T': c.green,
};

export const imageMap: Record<string, string> = {
    A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, front
};
