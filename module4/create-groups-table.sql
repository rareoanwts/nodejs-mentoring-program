DROP TABLE public."groups";

CREATE TABLE Groups (
      id UUID NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      permissions VARCHAR(255)[] NOT NULL
);

INSERT INTO public."groups"(
	id, name, permissions)
	VALUES ('da0bd295-9f11-4d9b-b245-7fe283fe424d', 'ADMINS', '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}');
	
INSERT INTO public."groups"(
	id, name, permissions)
	VALUES ('02233ed6-b385-4e05-996a-6d361b3e1df7', 'USERS', '{"READ", "WRITE", "DELETE"}');