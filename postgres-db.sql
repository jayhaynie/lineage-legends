--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-10-02 17:32:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 41081)
-- Name: characters_base; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.characters_base (
    name character varying(30),
    type character varying(30),
    heirloom_id character varying(30),
    image_id character varying(30),
    health_max integer,
    ability1_name character varying(30),
    ability1_desc character varying(100),
    ability1_cost integer,
    ability1_uses integer,
    ability2_name character varying(30),
    ability2_desc character varying(100),
    ability2_cost integer,
    ability2_uses integer,
    initial_protection integer
);


ALTER TABLE public.characters_base OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16511)
-- Name: characters_leader; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.characters_leader (
    name character varying(30),
    type character varying(30),
    heirloom_id character varying(30),
    image_id character varying(30),
    health_max integer,
    ability1_name character varying(30),
    ability1_desc character varying(100),
    ability1_cost integer,
    ability1_uses integer,
    ability2_name character varying(30),
    ability2_desc character varying(100),
    ability2_cost integer,
    ability2_uses integer,
    initial_protection integer
);


ALTER TABLE public.characters_leader OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16505)
-- Name: enemy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enemy (
    name character varying(30),
    type character varying(30),
    image_id character varying(30),
    health_max integer,
    ability1_name character varying(30),
    ability1_desc character varying(60),
    ability1_ammount integer,
    initial_protection integer
);


ALTER TABLE public.enemy OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16508)
-- Name: enemy_leader; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enemy_leader (
    name character varying(30),
    type character varying(30),
    image_id character varying(30),
    health_max integer,
    ability1_name character varying(30),
    ability1_desc character varying(60),
    ability1_ammount integer,
    initial_protection integer,
    ability2_name character varying(30),
    ability2_desc character varying(60),
    ability2_ammount integer,
    ability2_maxuse integer,
    ability3_name character varying(30),
    ability3_desc character varying(60),
    ability3_ammount integer,
    ability3_maxuse integer
);


ALTER TABLE public.enemy_leader OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16502)
-- Name: heirlooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.heirlooms (
    id character varying(30),
    description character varying(100),
    ammount integer
);


ALTER TABLE public.heirlooms OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 41152)
-- Name: jay_cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jay_cards (
    name character varying(30),
    type character varying(30),
    heirloom_id character varying(30),
    image_id character varying(30),
    health_max integer,
    ability1_name character varying(30),
    ability1_desc character varying(100),
    ability1_cost integer,
    ability1_uses integer,
    ability2_name character varying(30),
    ability2_desc character varying(100),
    ability2_cost integer,
    ability2_uses integer,
    initial_protection integer
);


ALTER TABLE public.jay_cards OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 41105)
-- Name: players; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.players (
    username character varying(30),
    password character varying(30),
    arcane_track integer,
    bandit_track integer,
    ghoul_track integer,
    legion_track integer,
    pirate_track integer,
    bond integer,
    wisdom integer,
    ghoul_bribed character varying(5),
    legion_bribed character varying(5),
    arcane_bribed character varying(5),
    redbotlink character varying(5),
    flaminglasersword character varying(5),
    yellowbotlink character varying(5),
    batterybelt character varying(5),
    summonerlight character varying(5),
    etherbow character varying(5),
    righteouswings character varying(5),
    potency character varying(5),
    elvenmetronome character varying(5),
    riverrock character varying(5),
    stethoscope character varying(5),
    techglasses character varying(5),
    shieldoflight character varying(5),
    mjolnirarmor character varying(5),
    wolfwhistle character varying(5),
    trenchcoat character varying(5),
    bluebotlink character varying(5),
    staffofjustice character varying(5)
);


ALTER TABLE public.players OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 41149)
-- Name: sayj_cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sayj_cards (
    name character varying(30),
    type character varying(30),
    heirloom_id character varying(30),
    image_id character varying(30),
    health_max integer,
    ability1_name character varying(30),
    ability1_desc character varying(100),
    ability1_cost integer,
    ability1_uses integer,
    ability2_name character varying(30),
    ability2_desc character varying(100),
    ability2_cost integer,
    ability2_uses integer,
    initial_protection integer
);


ALTER TABLE public.sayj_cards OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 32890)
-- Name: summons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.summons (
    name character varying(30),
    type character varying(30),
    image_id character varying(30),
    health_max integer,
    ability1_name character varying(30),
    ability1_desc character varying(100),
    ability1_ammount integer,
    initial_protection integer,
    ability1_cost integer,
    ability1_uses integer
);


ALTER TABLE public.summons OWNER TO postgres;

--
-- TOC entry 4923 (class 0 OID 41081)
-- Dependencies: 222
-- Data for Name: characters_base; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.characters_base (name, type, heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection) FROM stdin;
Veritan	UTILITY	flaminglasersword	veritan	60	Flame Strike	Deal 5 damage	2	999	Searing Truth	Give 3 protection to all allies	3	1	0
SayJ	FIGHTER	yellowbotlink	sayj	24	Precision Shot	Deal 5 damage	2	999	AP Rounds	Deal 5 damage ignoring protection	3	1	0
Jo Nator	UTILITY	batterybelt	jonator	37	Shock Shield	Shield an ally from 2 damage twice	2	999	Negative Charge	Deal 2 damage to all enemies	3	1	5
S.P.E.C.T.	SUPPORT	potency	spect	25	Acid Vial	Deal 5 damage	2	999	Healthy Brew	Heal an ally from 5 damage	3	1	0
Corazon	FIGHTER	etherbow	corazon	28	Rapid Fire	Fire 2 arrows dealing 3 damage	2	999	Ether Arrow	Deal 5 damage ignoring protection	3	1	0
Tyrel	FIGHTER	righteouswings	tyrel	28	Slash	Deal 5 damage	2	999	Light of Heaven	Heal an ally 5 damage	3	1	0
Pasha	SUPPORT	techglasses	pasha	57	EMP	Remove all protection from an enemy	2	999	Call for Helper	Summon a helper	3	1	0
Wilder	FIGHTER	wolfwhistle	wilder	33	Howl of the Pack	Give all allies 2 protection	2	999	Canine Call	Summon a canine	3	1	0
Clutch	UTILITY	bluebotlink	clutch	22	Armored Vehicle	Shield an ally from 5 damage	2	999	Expert Transport	Net +1 energy	3	1	0
Braynie	UTILITY	staffofjustice	braynie	33	Monkey See	Adapt a basic Enemy Ability	2	999	Monkey Do	Steal up to 5 protection from an enemy	3	1	0
Observer	UTILITY	trenchcoat	observer	36	Foresight	Give an ally 5 protection	2	999	Fix Time	Steal 3 health from an enemy	3	1	0
Cadenza	SUPPORT	elvenmetronome	cadenza	29	Magic Tune	Heal an ally from 3 damage	2	999	Overdrive	Deal 2 damage to all enemies	3	1	0
Liza	SUPPORT	riverrock	liza	30	Spirit Water	Heal an ally from 3 damage	2	999	Flood	Deal 2 damage to all enemies	3	1	0
Dr. Aris	SUPPORT	stethoscope	aris	29	Surgery	Heal an ally from 5 damage	2	999	Emergency Medicine	Heal all allies from 3 damage	3	1	0
T`Risa	SUPPORT	shieldoflight	trisa	35	Bash and Slash	Deal 3 damage to an enemy twice	2	999	Phalanx	Shield all allies from 3 damage	3	1	5
J.O.N.	FIGHTER	mjolnirarmor	jon	34	J.ustice O.r N.othing	Deal 5 damage	2	999	AI Virus	Remove all protection from an enemy	3	1	5
Kellbourne	FIGHTER	redbotlink	kellbourne	26	Double Gate	Deal 3 damage twice	2	999	Defensive Guard	Give 3 protection to an ally twice	3	1	0
Maggie	UTILITY	summonerlight	maggie	32	Light of Creation	Heal all allies from 2 damage	2	999	Call Small Creature	Summon a random small creature	3	1	0
\.


--
-- TOC entry 4921 (class 0 OID 16511)
-- Dependencies: 220
-- Data for Name: characters_leader; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.characters_leader (name, type, heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection) FROM stdin;
Observer	UTILITY	trenchcoat	observer	36	Foresight	Give an ally 5 protection	2	999	Fix Time	Steal 3 health from an enemy	3	1	0
Kellbourne	FIGHTER	redbotlink	kellbourne	26	Double Gate	Deal 3 damage twice	2	999	Defensive Guard	Give 3 protection to an ally twice	3	1	0
Veritan	UTILITY	flaminglasersword	veritan	60	Flame Strike	Deal 5 damage	2	999	Searing Truth	Give 3 protection to all allies	3	1	0
SayJ	FIGHTER	yellowbotlink	sayj	24	Precision Shot	Deal 5 damage	2	999	AP Rounds	Deal 5 damage ignoring protection	3	1	0
Jo Nator	UTILITY	batterybelt	jonator	37	Shock Shield	Shield an ally from 2 damage twice	2	999	Negative Charge	Deal 2 damage to all enemies	3	1	5
Corazon	FIGHTER	etherbow	corazon	28	Rapid Fire	Fire 2 arrows dealing 3 damage	2	999	Ether Arrow	Deal 5 damage ignoring protection	3	1	0
Tyrel	FIGHTER	righteouswings	tyrel	28	Slash	Deal 5 damage	2	999	Light of Heaven	Heal an ally 5 damage	3	1	0
Maggie	UTILITY	summonerlight	maggie	32	Command	Heal all allies from 2 damage	2	999	Call Small Creature	Summon a random small creature	3	1	0
Clutch	UTILITY	bluebotlink	clutch	22	Armored Vehicle	Shield an ally from 5 damage	2	999	Expert Transport	Net +1 energy	3	1	0
Cadenza	SUPPORT	elvenmetronome	cadenza	29	Magic Tune	Heal an ally from 3 damage	2	999	Overdrive	Deal 2 damage to all enemies	3	1	0
Liza	SUPPORT	riverrock	liza	30	Spirit Water	Heal an ally from 3 damage	2	999	Flood	Deal 2 damage to all enemies	3	1	0
Dr. Aris	SUPPORT	stethoscope	aris	29	Surgery	Heal an ally from 5 damage	2	999	Emergency Medicine	Heal all allies from 3 damage	3	1	0
T`Risa	SUPPORT	shieldoflight	trisa	35	Bash and Slash	Deal 3 damage to an enemy twice	2	999	Phalanx	Shield all allies from 3 damage	3	1	5
J.O.N.	FIGHTER	mjolnirarmor	jon	34	J.ustice O.r N.othing	Deal 5 damage	2	999	AI Virus	Remove all protection from an enemy	3	1	5
S.P.E.C.T.	SUPPORT	potency	spect	25	Acid Vial	Deal 5 damage	2	999	Healthy Brew	Heal an ally from 5 damage	3	1	0
Pasha	SUPPORT	techglasses	pasha	57	EMP	Remove all protection from an enemy	2	999	Call for Helper	Summon a helper	3	1	0
Wilder	FIGHTER	wolfwhistle	wilder	33	Howl of the Pack	Give all allies 2 protection	2	999	Canine Call	Summon a canine	3	1	0
Braynie	UTILITY	staffofjustice	braynie	33	Monkey See	Adapt a basic Enemy Ability	2	999	Monkey Do	Steal up to 5 protection from an enemy	3	1	0
\.


--
-- TOC entry 4919 (class 0 OID 16505)
-- Dependencies: 218
-- Data for Name: enemy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enemy (name, type, image_id, health_max, ability1_name, ability1_desc, ability1_ammount, initial_protection) FROM stdin;
Ice Mage	arcane	arcane1	14	Frost Ray	Deal 10 damage ignoring protection	10	20
Water Wizard	arcane	arcane3	16	Water Whip	Deal 6 damage twice	6	15
Solar Sorceress	arcane	arcane2	18	Life Mage	Heal an ally from 5 damage twice	5	15
Pyromancer	arcane	arcane4	18	Fireball	Deal 5 damage to all enemies	5	10
Healer Hermit	arcane	arcane5	24	Yew Breeze	Heal all allies 5 damage	5	20
Energy Evoker	arcane	arcane6	14	Shock	Remove all protection from an enemy	0	15
Frozen Ghoul	ghoul	ghoul6	22	Ice Blade	Deal 6 damage ignoring protection	6	12
Geared Ghoul	ghoul	ghoul5	23	Blade Tornado	Deal 3 damage to all enemies	3	8
3 Arm Ghoul	ghoul	ghoul3	24	Triple Stab	Deal 6 damage	6	0
Grunt Goul	ghoul	ghoul2	20	Slice	Deal 5 damage	5	5
Giant Ghoul	ghoul	ghoul4	28	Stomp	Deal 8 damage	8	10
Ember Ghoul	ghoul	ghoul1	22	Flame Spear	Deal 7 damage	7	0
Guard	legion	legion4	12	Shield	Shield an ally from 6 damage twice	6	15
Thief	pirate	pirate1	12	Gut	Deal 3 damage	3	5
Archer	legion	legion1	10	Sharp Shot	Deal 7 damage	7	10
Berserk	legion	legion2	15	Bash	Deal 6 damage	6	10
Cloak Bandit	bandit	bandit1	12	Cut	Deal 3 damage	3	0
Armored Bandit	bandit	bandit3	14	Defend	Shield an ally from 3 damage	3	8
Banner Bearer	legion	legion5	10	Inspire	Heal all allies from 5 damage	5	5
Mage Bandit	bandit	bandit4	16	Heal	Heal an ally from 3 damage	3	0
Polearm Bandit	bandit	bandit5	12	Swinging Slash	Deal 3 damage twice	3	0
Stout Bandit	bandit	bandit6	10	Crush	Deal 2 damage twice	2	6
Runner	pirate	pirate2	14	Rush	Deal 3 damage ignoring protection	3	0
Swords Woman	legion	legion6	14	Spinning Slash	Deal 4 damage to all enemies	4	10
Brigand	pirate	pirate3	18	Parry	Shield an ally from 5 damage	5	7
Long Sword	pirate	pirate4	14	Wide Slash	Deal 5 damage twice	5	0
Boomer	pirate	pirate5	12	Blast	Deal 2 damage to all enemies	2	0
First Mate	pirate	pirate6	16	Counter	Steal 4 health from an enemy	4	10
Captian	legion	legion3	15	Sword of Light	Steal 7 health	7	15
Stealth Bandit	bandit	bandit2	10	Stab	Deal 3 damage	3	0
\.


--
-- TOC entry 4920 (class 0 OID 16508)
-- Dependencies: 219
-- Data for Name: enemy_leader; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enemy_leader (name, type, image_id, health_max, ability1_name, ability1_desc, ability1_ammount, initial_protection, ability2_name, ability2_desc, ability2_ammount, ability2_maxuse, ability3_name, ability3_desc, ability3_ammount, ability3_maxuse) FROM stdin;
Captain of the Angar	pirate	pirateLeader	70	Quick Fire	Deal 8 damage twice	8	10	Cannon Barrage	Deal 10 damage to all enemies	10	0	All Hands	Call a pirate into battle	0	0
Angel of The Legion	legion	legionLeader	100	Sever	Deal 10 damage	10	50	Winged Defense	Give all allies 10 protection	10	0	Orders	Call a legion soldier into battle	0	0
Undead Summoner	ghoul	ghoulLeader	70	Siphon	Steal 10 health	10	30	Unholy Aura	Deal 7 damage to all enemies	7	0	Necromancer	Raise another ghoul	0	0
Bandit Chief	bandit	banditLeader	50	Blade Volley	Deal 7 damage twice	7	30	Armor Troops	Give all allies 7 protection	7	0	Demand	Call another bandit into battle	0	0
Arch Mage	arcane	arcaneLeader	80	Arcane Knowledge	Use a random magic ability	0	20	Arcane Blast	Remove all enemy protection	0	0	Energy Dome	Give all allies 20 protection	20	0
\.


--
-- TOC entry 4918 (class 0 OID 16502)
-- Dependencies: 217
-- Data for Name: heirlooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.heirlooms (id, description, ammount) FROM stdin;
blueBotLink	Start combat with a shield against damage for 10 times the number of bot links	10
yellowBotLink	Start combat with a shield against damage for 10 times the number of bot links	10
redBotLink	Start combat with a shield against damage for 10 times the number of bot links	10
potency	Increase the potency of potions by 3	3
etherBow	Rapid Fire with 3 arrows	3
wolfWhistle	Howl of the Pack summons 2 dogs	2
elvishMetronome	Jolly Tune heals for half of max health	0
riverRock	Flood hits all enemies and Spirit Water heals all allies	0
righteousWings	50 percent chance to evade attacks	0
summonerLight	Call Creature now summons a random large creature	0
batteryBelt	All damage recieved applies to next shock shield	0
staffOfJustice	Monkey See, Monkey Do now resets every turn	0
stethoscope	Healing from Dr. Aris is doubled	2
shieldOfLight	Damage from Bash and Slash heals T`Risa	3
mjolnirArmor	Replenish up to 5 shields each turn	5
trenchCoat	Cannot be buffed, debuffed, shielded, healed, or affected	0
techGlasses	EMP pulse can target buffs only or debuffs only	0
flamingLaserSword	Damage from Veritan cannot be healed back	0
blueBotLink	Start combat with a shield against damage for 10 times the number of bot links	10
yellowBotLink	Start combat with a shield against damage for 10 times the number of bot links	10
redBotLink	Start combat with a shield against damage for 10 times the number of bot links	10
potency	Increase the potency of potions by 3	3
etherBow	Rapid Fire with 3 arrows	3
wolfWhistle	Howl of the Pack summons 2 dogs	2
elvishMetronome	Jolly Tune heals for half of max health	0
riverRock	Flood hits all enemies and Spirit Water heals all allies	0
righteousWings	50 percent chance to evade attacks	0
summonerLight	Call Creature now summons a random large creature	0
batteryBelt	All damage recieved applies to next shock shield	0
staffOfJustice	Monkey See, Monkey Do now resets every turn	0
stethoscope	Healing from Dr. Aris is doubled	2
shieldOfLight	Damage from Bash and Slash heals T`Risa	3
mjolnirArmor	Replenish up to 5 shields each turn	5
trenchCoat	Cannot be buffed, debuffed, shielded, healed, or affected	0
techGlasses	EMP pulse can target buffs only or debuffs only	0
flamingLaserSword	Damage from Veritan cannot be healed back	0
\.


--
-- TOC entry 4926 (class 0 OID 41152)
-- Dependencies: 225
-- Data for Name: jay_cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jay_cards (name, type, heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection) FROM stdin;
Pasha	shop1	techglasses	pasha	57	EMP	Remove all protection from an enemy	2	999	Call for Helper	Summon a helper	3	1	0
Braynie	shop1	staffofjustice	braynie	33	Monkey See	Adapt a basic Enemy Ability	2	999	Monkey Do	Steal up to 5 protection from an enemy	3	1	0
Cadenza	shop1	elvenmetronome	cadenza	29	Magic Tune	Heal an ally from 3 damage	2	999	Overdrive	Deal 2 damage to all enemies	3	1	0
Kellbourne	shop1	redbotlink	kellbourne	26	Double Gate	Deal 3 damage twice	2	999	Defensive Guard	Give 3 protection to an ally twice	3	1	0
Veritan	shop2	flaminglasersword	veritan	60	Flame Strike	Deal 5 damage	2	999	Searing Truth	Give 3 protection to all allies	3	1	0
Liza	shop2	riverrock	liza	30	Spirit Water	Heal an ally from 3 damage	2	999	Flood	Deal 2 damage to all enemies	3	1	0
T`Risa	shop2	shieldoflight	trisa	35	Bash and Slash	Deal 3 damage to an enemy twice	2	999	Phalanx	Shield all allies from 3 damage	3	1	5
J.O.N.	shop2	mjolnirarmor	jon	34	J.ustice O.r N.othing	Deal 5 damage	2	999	AI Virus	Remove all protection from an enemy	3	1	5
Jo Nator	shop3	batterybelt	jonator	37	Shock Shield	Shield an ally from 2 damage twice	2	999	Negative Charge	Deal 2 damage to all enemies	3	1	5
S.P.E.C.T.	shop3	potency	spect	25	Acid Vial	Deal 5 damage	2	999	Healthy Brew	Heal an ally from 5 damage	3	1	0
Clutch	shop3	bluebotlink	clutch	22	Armored Vehicle	Shield an ally from 5 damage	2	999	Expert Transport	Net +1 energy	3	1	0
Maggie	shop3	summonerlight	maggie	32	Light of Creation	Heal all allies from 2 damage	2	999	Call Small Creature	Summon a random small creature	3	1	0
SayJ	shop4	yellowbotlink	sayj	24	Precision Shot	Deal 5 damage	2	999	AP Rounds	Deal 5 damage ignoring protection	3	1	0
Corazon	shop4	etherbow	corazon	28	Rapid Fire	Fire 2 arrows dealing 3 damage	2	999	Ether Arrow	Deal 5 damage ignoring protection	3	1	0
Observer	shop4	trenchcoat	observer	36	Foresight	Give an ally 5 protection	2	999	Fix Time	Steal 3 health from an enemy	3	1	0
Dr. Aris	shop4	stethoscope	aris	29	Surgery	Heal an ally from 5 damage	2	999	Emergency Medicine	Heal all allies from 3 damage	3	1	0
Tyrel	leader	righteouswings	tyrel	28	Slash	Deal 5 damage	2	999	Light of Heaven	Heal an ally 5 damage	3	1	0
Wilder	base	wolfwhistle	wilder	33	Howl of the Pack	Give all allies 2 protection	2	999	Canine Call	Summon a canine	3	1	0
\.


--
-- TOC entry 4924 (class 0 OID 41105)
-- Dependencies: 223
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.players (username, password, arcane_track, bandit_track, ghoul_track, legion_track, pirate_track, bond, wisdom, ghoul_bribed, legion_bribed, arcane_bribed, redbotlink, flaminglasersword, yellowbotlink, batterybelt, summonerlight, etherbow, righteouswings, potency, elvenmetronome, riverrock, stethoscope, techglasses, shieldoflight, mjolnirarmor, wolfwhistle, trenchcoat, bluebotlink, staffofjustice) FROM stdin;
Jay	Who	1	1	1	1	1	0	0	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false
SayJ	313609	1	2	1	1	1	600	0	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false	false
\.


--
-- TOC entry 4925 (class 0 OID 41149)
-- Dependencies: 224
-- Data for Name: sayj_cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sayj_cards (name, type, heirloom_id, image_id, health_max, ability1_name, ability1_desc, ability1_cost, ability1_uses, ability2_name, ability2_desc, ability2_cost, ability2_uses, initial_protection) FROM stdin;
Pasha	shop1	techglasses	pasha	57	EMP	Remove all protection from an enemy	2	999	Call for Helper	Summon a helper	3	1	0
Observer	shop1	trenchcoat	observer	36	Foresight	Give an ally 5 protection	2	999	Fix Time	Steal 3 health from an enemy	3	1	0
Kellbourne	shop1	redbotlink	kellbourne	26	Double Gate	Deal 3 damage twice	2	999	Defensive Guard	Give 3 protection to an ally twice	3	1	0
Maggie	shop1	summonerlight	maggie	32	Light of Creation	Heal all allies from 2 damage	2	999	Call Small Creature	Summon a random small creature	3	1	0
Tyrel	shop2	righteouswings	tyrel	28	Slash	Deal 5 damage	2	999	Light of Heaven	Heal an ally 5 damage	3	1	0
Wilder	shop2	wolfwhistle	wilder	33	Howl of the Pack	Give all allies 2 protection	2	999	Canine Call	Summon a canine	3	1	0
Cadenza	shop2	elvenmetronome	cadenza	29	Magic Tune	Heal an ally from 3 damage	2	999	Overdrive	Deal 2 damage to all enemies	3	1	0
Liza	shop2	riverrock	liza	30	Spirit Water	Heal an ally from 3 damage	2	999	Flood	Deal 2 damage to all enemies	3	1	0
Veritan	shop3	flaminglasersword	veritan	60	Flame Strike	Deal 5 damage	2	999	Searing Truth	Give 3 protection to all allies	3	1	0
Corazon	shop3	etherbow	corazon	28	Rapid Fire	Fire 2 arrows dealing 3 damage	2	999	Ether Arrow	Deal 5 damage ignoring protection	3	1	0
Clutch	shop3	bluebotlink	clutch	22	Armored Vehicle	Shield an ally from 5 damage	2	999	Expert Transport	Net +1 energy	3	1	0
Braynie	shop3	staffofjustice	braynie	33	Monkey See	Adapt a basic Enemy Ability	2	999	Monkey Do	Steal up to 5 protection from an enemy	3	1	0
Jo Nator	shop4	batterybelt	jonator	37	Shock Shield	Shield an ally from 2 damage twice	2	999	Negative Charge	Deal 2 damage to all enemies	3	1	5
S.P.E.C.T.	shop4	potency	spect	25	Acid Vial	Deal 5 damage	2	999	Healthy Brew	Heal an ally from 5 damage	3	1	0
T`Risa	shop4	shieldoflight	trisa	35	Bash and Slash	Deal 3 damage to an enemy twice	2	999	Phalanx	Shield all allies from 3 damage	3	1	5
J.O.N.	shop4	mjolnirarmor	jon	34	J.ustice O.r N.othing	Deal 5 damage	2	999	AI Virus	Remove all protection from an enemy	3	1	5
SayJ	leader	yellowbotlink	sayj	24	Precision Shot	Deal 5 damage	2	999	AP Rounds	Deal 5 damage ignoring protection	3	1	0
Dr. Aris	base	stethoscope	aris	29	Surgery	Heal an ally from 5 damage	2	999	Emergency Medicine	Heal all allies from 3 damage	3	1	0
\.


--
-- TOC entry 4922 (class 0 OID 32890)
-- Dependencies: 221
-- Data for Name: summons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.summons (name, type, image_id, health_max, ability1_name, ability1_desc, ability1_ammount, initial_protection, ability1_cost, ability1_uses) FROM stdin;
Pooh	canine	pooh	8	Howl	Deal 3 damage	3	0	1	999
Herkie	canine	herkie	8	Tackle	Deal 3 damage	3	0	1	999
Drak	smallCreature	Drak	5	Tail Whip	Deal 2 damage twice	1	0	1	999
Claw Rat	smallCreature	clawrat	5	Claw	Deal 4 damage	1	0	1	999
Ear Bat	smallCreature	earbat	5	Listen	Heal 4 damage	1	0	1	999
Bog	smallCreature	bog	5	Growl	Deal 1 damage to all enemies	0	0	1	999
Snek	smallCreature	snek	5	Venom Bite	Deal 3 damage ignoring protection	1	0	1	999
Bark	canineStrong	bark	12	Scratch Command	Deal 5 damage	5	5	1	999
Herkie	canineStrong	herkie	12	Tackle Command	Deal 5 damage	5	5	1	999
Lillo	canineStrong	lillo	12	Bark Command	Deal 5 damage	5	5	1	999
Pooh	canineStrong	pooh	12	Howl Command	Deal 5 damage	5	5	1	999
Zhoos	canineStrong	zhoos	12	Hunt Command	Deal 5 damage	5	5	1	999
Zhoos	canine	zhoos	8	Hunt	Deal 3 damage	3	0	1	999
Pierre	helper	pierre	6	Obsidian Builder	Give an ally 2 protection	2	0	1	999
Ian	helper	ian	3	Smiley	Heal 2 damage	0	0	1	999
Mayla	helper	mayla	2	Extra Hugs	Heal 2 damage	1	0	1	999
Tiri	helper	tiri	1	Cutie	Heal all allies from 1 damage	0	0	1	999
Calvin	helper	calvin	2	Sing	Shield all allies from 1 damage	1	0	1	999
Wallie	helper	wallie	1	So Nice	Heal all allies from 1 damage	1	0	1	999
Roran	helper	roran	9	Saber Edge	Protect all allies from 3 damage	2	0	1	999
Rey Lynn	helper	reylynn	12	Force Heal	Heal an ally from 4 damage	2	0	1	999
Ethan	helper	ethan	4	Dino Friends	Deal 2 damage to all enemies	2	0	1	999
Bark	canine	bark	8	Scratch	Deal 3 damage	3	0	1	999
Lillo	canine	lillo	8	Bark	Deal 3 damage	3	0	1	999
Rein Drake	largeCreature	reindrake	10	Fly Up	Give an ally 6 protection	0	0	1	999
Elder Bog	largeCreature	elderbog	10	Quake	Deal 3 damage to all enemies	2	0	1	999
Treant	largeCreature	treant	10	Nature	Heal 4 damage twice	4	0	1	999
Thunder Cat	largeCreature	thundercat	10	Yowl	Deal 3 damage to 2 enemies	0	0	1	999
Giant Eagle	largeCreature	gianteagle	10	Razor Talons	Deal 3 damage to 2 enemies	4	0	1	999
\.


-- Completed on 2025-10-02 17:32:03

--
-- PostgreSQL database dump complete
--

