SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    favoriteid SERIAL PRIMARY KEY,
    iduser integer NOT NULL,
    movieid integer,
    serieid integer,
    shareable_link character varying(255)
);


ALTER TABLE public.favorites OWNER TO postgres;

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
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favoriteid);


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
-- Name: favorites fk_favorites_iduser; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT fk_favorites_iduser FOREIGN KEY (iduser) REFERENCES public.users(iduser) ON DELETE CASCADE;


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

TRUNCATE TABLE reviews;

CREATE TABLE group_movies (
    idgroup_movies SERIAL PRIMARY KEY,
    serieid INT,
    movieid INT,
    idgroup INT,
    iduser INT,
    FOREIGN KEY (iduser) REFERENCES users(iduser) ON DELETE CASCADE,
    FOREIGN KEY (idgroup) REFERENCES "group"(idgroup) ON DELETE CASCADE
);

CREATE TABLE group_reviews (
    idgroup_reviews SERIAL PRIMARY KEY,
    idgroup INT,
    idreviews INT,
    FOREIGN KEY (idgroup) REFERENCES "group"(idgroup),
    FOREIGN KEY (idreviews) REFERENCES reviews(idreviews)
);
CREATE TABLE group_event(
    idshow SERIAL PRIMARY KEY,
    eventid INTEGER NOT NULL,
    idgroup INTEGER,
    FOREIGN KEY (idgroup) REFERENCES "group"(idgroup)
);
TRUNCATE TABLE group_reviews;

ALTER TABLE group_event
ADD COLUMN startingTime TIMESTAMP,
ADD COLUMN urlToShow VARCHAR(255),
ADD COLUMN theatre VARCHAR(100);


CREATE TABLE group_request (
    idgroup_request SERIAL PRIMARY KEY,
    idgroup INTEGER REFERENCES "group"(idgroup),
    iduser INTEGER REFERENCES users(iduser)
);

-- Add CASCADE to group_movies table
ALTER TABLE group_movies
  DROP CONSTRAINT IF EXISTS group_movies_iduser_fkey,
  DROP CONSTRAINT IF EXISTS group_movies_idgroup_fkey,
  ADD CONSTRAINT group_movies_iduser_fkey FOREIGN KEY (iduser) REFERENCES users(iduser) ON DELETE CASCADE,
  ADD CONSTRAINT group_movies_idgroup_fkey FOREIGN KEY (idgroup) REFERENCES "group"(idgroup) ON DELETE CASCADE;

-- Add CASCADE to group_reviews table
ALTER TABLE group_reviews
  DROP CONSTRAINT IF EXISTS group_reviews_idgroup_fkey,
  DROP CONSTRAINT IF EXISTS group_reviews_idreviews_fkey,
  ADD CONSTRAINT group_reviews_idgroup_fkey FOREIGN KEY (idgroup) REFERENCES "group"(idgroup) ON DELETE CASCADE,
  ADD CONSTRAINT group_reviews_idreviews_fkey FOREIGN KEY (idreviews) REFERENCES reviews(idreviews) ON DELETE CASCADE;

-- Add CASCADE to group_event table
ALTER TABLE group_event
  DROP CONSTRAINT IF EXISTS group_event_idgroup_fkey,
  ADD CONSTRAINT group_event_idgroup_fkey FOREIGN KEY (idgroup) REFERENCES "group"(idgroup) ON DELETE CASCADE;

-- Add CASCADE to group_request table
ALTER TABLE group_request
  DROP CONSTRAINT IF EXISTS group_request_idgroup_fkey,
  DROP CONSTRAINT IF EXISTS group_request_iduser_fkey,
  ADD CONSTRAINT group_request_idgroup_fkey FOREIGN KEY (idgroup) REFERENCES "group"(idgroup) ON DELETE CASCADE,
  ADD CONSTRAINT group_request_iduser_fkey FOREIGN KEY (iduser) REFERENCES users(iduser) ON DELETE CASCADE;


