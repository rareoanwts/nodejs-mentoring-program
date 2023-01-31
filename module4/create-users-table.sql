DROP TABLE public."users";

CREATE TABLE Users (
      id UUID NOT NULL PRIMARY KEY,
      login VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
	  age INTEGER NOT NULL,
	  isDeleted BOOLEAN DEFAULT false
);

INSERT INTO public."users"(
	id, login, password, age)
	VALUES ('da0bd295-9f11-4d9b-b548-7fe283fe424d', 'MichaelKSkeen@jourrapide.com', '3u2R7Gh84uN4', 25);
	
INSERT INTO public."users"(
	id, login, password, age)
	VALUES ('02233ed6-b397-4e05-996a-6d361b3e1df7', 'JamesHWarren@rhyta.com', '7qf9AJ2TZc0R', 29);
	
INSERT INTO public."users"(
	id, login, password, age)
	VALUES ('dc40037c-7598-450f-ae39-7783bd74b38d', 'DorisJVega@teleworm.us', 'h60Ln01Di5mO', 66);
	
INSERT INTO public."users"(
	id, login, password, age)
	VALUES ('6783c088-fa6b-4ff3-bb23-58c9db9f3136', 'AnthonyCMcPeters@rhyta.com', '1oq73JbCoB7y', 44);
	
INSERT INTO public."users"(
	id, login, password, age)
	VALUES ('91f3d08a-df88-4305-8d21-4423646e797e', 'LeaGOuellette@teleworm.us', '7hy2cj5l9Ykg', 44);