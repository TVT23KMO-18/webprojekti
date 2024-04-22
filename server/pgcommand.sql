--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favourites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favourites (
    favoriteid integer NOT NULL,
    iduser integer NOT NULL,
    movieid integer,
    serieid integer,
    shareable_link character varying(255)
);


ALTER TABLE public.favourites OWNER TO postgres;

--
-- Name: group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."group" (
    idgroup integer NOT NULL,
    groupname text,
    owner text,
    description text
);


ALTER TABLE public."group" OWNER TO postgres;

--
-- Name: group_idgroup_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.group_idgroup_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.group_idgroup_seq OWNER TO postgres;

--
-- Name: group_idgroup_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.group_idgroup_seq OWNED BY public."group".idgroup;


--
-- Name: group_membership; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.group_membership (
    idgroup_membership integer NOT NULL,
    iduser integer NOT NULL,
    idgroup integer NOT NULL
);


ALTER TABLE public.group_membership OWNER TO postgres;

--
-- Name: group_membership_idgroup_membership_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.group_membership_idgroup_membership_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.group_membership_idgroup_membership_seq OWNER TO postgres;

--
-- Name: group_membership_idgroup_membership_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.group_membership_idgroup_membership_seq OWNED BY public.group_membership.idgroup_membership;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    idreviews integer NOT NULL,
    iduser integer NOT NULL,
    review_text text,
    review_num integer NOT NULL,
    movieid integer,
    serieid integer
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_idreviews_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_idreviews_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_idreviews_seq OWNER TO postgres;

--
-- Name: reviews_idreviews_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_idreviews_seq OWNED BY public.reviews.idreviews;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    iduser integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_iduser_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_iduser_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_iduser_seq OWNER TO postgres;

--
-- Name: users_iduser_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_iduser_seq OWNED BY public.users.iduser;


--
-- Name: group idgroup; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group" ALTER COLUMN idgroup SET DEFAULT nextval('public.group_idgroup_seq'::regclass);


--
-- Name: group_membership idgroup_membership; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_membership ALTER COLUMN idgroup_membership SET DEFAULT nextval('public.group_membership_idgroup_membership_seq'::regclass);


--
-- Name: reviews idreviews; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN idreviews SET DEFAULT nextval('public.reviews_idreviews_seq'::regclass);


--
-- Name: users iduser; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN iduser SET DEFAULT nextval('public.users_iduser_seq'::regclass);


--
-- Name: favourites favourites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favourites_pkey PRIMARY KEY (favoriteid);


--
-- Name: group_membership group_membership_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_membership
    ADD CONSTRAINT group_membership_pkey PRIMARY KEY (idgroup_membership);


--
-- Name: group group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (idgroup);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (idreviews);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (iduser);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: favourites fk_favourites_iduser; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT fk_favourites_iduser FOREIGN KEY (iduser) REFERENCES public.users(iduser) ON DELETE CASCADE;


--
-- Name: group_membership fk_group_membership_iduser; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_membership
    ADD CONSTRAINT fk_group_membership_iduser FOREIGN KEY (iduser) REFERENCES public.users(iduser) ON DELETE CASCADE;


--
-- Name: reviews fk_reviews_iduser; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_reviews_iduser FOREIGN KEY (iduser) REFERENCES public.users(iduser) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

