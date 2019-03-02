                                                             Table "public.drivers"
     Column     |           Type           | Collation | Nullable |               Default               | Storage  | Stats target | Description 
----------------+--------------------------+-----------+----------+-------------------------------------+----------+--------------+-------------
 id             | integer                  |           | not null | nextval('drivers_id_seq'::regclass) | plain    |              | 
 firstName      | character varying(255)   |           |          |                                     | extended |              | 
 lastName       | character varying(255)   |           |          |                                     | extended |              | 
 ssn            | character varying(255)   |           |          |                                     | extended |              | 
 driversLicense | character varying(255)   |           |          |                                     | extended |              | 
 email          | character varying(255)   |           |          |                                     | extended |              | 
 phone          | character varying(255)   |           |          |                                     | extended |              | 
 hireDate       | character varying(255)   |           |          |                                     | extended |              | 
 dob            | character varying(255)   |           |          |                                     | extended |              | 
 streetAddress  | text                     |           |          |                                     | extended |              | 
 city           | character varying(255)   |           |          |                                     | extended |              | 
 state          | character varying(255)   |           |          |                                     | extended |              | 
 zipCode        | character varying(255)   |           |          |                                     | extended |              | 
 currentRate    | numeric                  |           |          |                                     | main     |              | 
 earnings       | numeric                  |           |          |                                     | main     |              | 
 employedBy     | character varying(255)   |           |          |                                     | extended |              | 
 createdAt      | timestamp with time zone |           | not null |                                     | plain    |              | 
 updatedAt      | timestamp with time zone |           | not null |                                     | plain    |              | 
Indexes:
    "drivers_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "loads" CONSTRAINT "loads_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES drivers(id) ON UPDATE CASCADE ON DELETE SET NULL

