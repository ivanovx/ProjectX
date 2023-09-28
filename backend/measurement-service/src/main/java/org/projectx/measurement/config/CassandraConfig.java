package org.projectx.measurement.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.cassandra.config.SchemaAction;
import org.springframework.data.cassandra.config.AbstractCassandraConfiguration;
import org.springframework.data.cassandra.core.cql.keyspace.CreateKeyspaceSpecification;
import org.springframework.data.cassandra.repository.config.EnableCassandraRepositories;

@Configuration
@EnableCassandraRepositories("org.projectx.measurement.domain")
public class CassandraConfig extends AbstractCassandraConfiguration {
    @Value("${spring.cassandra.keyspace-name}")
    private String keyspace;

    @Override
    protected String getKeyspaceName() {
        return this.keyspace;
    }

    @Override
    public SchemaAction getSchemaAction() {
        return SchemaAction.CREATE_IF_NOT_EXISTS;
    }

    @Override
    protected List<CreateKeyspaceSpecification> getKeyspaceCreations() {
        CreateKeyspaceSpecification specification = CreateKeyspaceSpecification
                .createKeyspace(keyspace)
                .ifNotExists()
                //.with(KeyspaceOption.DURABLE_WRITES, true)
                .withSimpleReplication(1);

        return List.of(specification);
    }

    @Override
    public String[] getEntityBasePackages() {
        return new String[] { "org.projectx.measurement.domain" };
    }
}
