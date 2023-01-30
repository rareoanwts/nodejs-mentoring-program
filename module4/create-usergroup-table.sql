DROP TABLE public."usergroup";

CREATE TABLE userGroup (
    id UUID NOT NULL PRIMARY KEY,
    userid UUID NOT NULL,
    groupid UUID NOT NULL
);

INSERT INTO public."usergroup"(
	id, userid, groupid)
	VALUES ('e91b4940-1559-4a42-98e4-030c91a9d3e1', '6783c088-fa6b-4ff3-bb23-58c9db9f3136', '987c1bca-dc69-4428-8b7e-55fdba576329');
	
INSERT INTO public."usergroup"(
	id, userid, groupid)
	VALUES ('573d8278-c6de-4410-8ce2-a6fc2f3c31a2', '91f3d08a-df88-4305-8d21-4423646e797e', '987c1bca-dc69-4428-8b7e-55fdba576329');

INSERT INTO public."usergroup"(
	id, userid, groupid)
	VALUES ('5fb29ef0-fd25-4e0a-a859-539471155837', 'da0bd295-9f11-4d9b-b548-7fe283fe424d', '987c1bca-dc69-4428-8b7e-55fdba576329');

INSERT INTO public."usergroup"(
	id, userid, groupid)
	VALUES ('0907c5da-f65b-4edb-8267-659273a48c89', 'dc40037c-7598-450f-ae39-7783bd74b38d', '987c1bca-dc69-4428-8b7e-55fdba576329');

INSERT INTO public."usergroup"(
	id, userid, groupid)
	VALUES ('68ad0e06-bff5-426b-830d-b433896d81e3', '02233ed6-b397-4e05-996a-6d361b3e1df7', '987c1bca-dc69-4428-8b7e-55fdba576329');

INSERT INTO public."usergroup"(
	id, userid, groupid)
	VALUES ('e4e3d215-3a84-4d5d-898a-6d7e9630f7ba', '02233ed6-b397-4e05-996a-6d361b3e1df7', 'da0bd295-9f11-4d9b-b245-7fe283fe424d');