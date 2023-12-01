# N-Tier architecture

1. Presentation layer - UI/front-end
2. Controller layer - Orchestrates actions between UI and bussines logic
3. Service layer - implements core app logic, provides services
4. Data Access layer DAO - manages databases and operatiosn

## Advantages

1. Modularity
2. Scalanility
3. Security
4. Mainrainability


## Layers

---------------
|  API Layer  |
---------------
    I   I
---------------
|   Business  |
|   Layer     |
---------------
   I   I
---------------
|   DAO       |
|   Layer     |
---------------
      I
---------------
|   Database  |
---------------