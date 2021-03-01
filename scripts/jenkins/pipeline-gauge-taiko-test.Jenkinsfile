/*
 ============================================================================
 This Jenkins declarative pipeline (using docker pipeline plugin) demonstrate how to run
 gauge+taiko test inside a container build agent.
 The image is based on the official gauge-taiko image from Docker Hub.
 ============================================================================

 Pre-requisite:
- Installed the following jenkins plugins:
	* https://wiki.jenkins.io/display/JENKINS/Git+Plugin
    * https://wiki.jenkins.io/display/JENKINS/Docker+Plugin
	* http://wiki.jenkins-ci.org/display/JENKINS/HTML+Publisher+Plugin
*/

properties(
  [
    buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '10')),
  ]
)

pipeline {
    agent {
        label 'master'
    }

    options {
        // disableConcurrentBuilds()
        timestamps()
        skipDefaultCheckout()
    }


    stages {

        stage('Preparation') {
            steps {
                // Enabled skipDefaultCheckout()
                script {
                    // sh 'printenv'
                    echo "git url: ${scm.userRemoteConfigs[0].url}"
                    echo "git branch: ${scm.branches[0].name}"

                    // checkout from version control configured in pipeline job
                    checkout scm // git branch: 'main', credentialsId: '<credentialsId>', url: '<repositoryUrl>'
                }

                stash name: 'gauge-taiko-source', includes: '*/**'
            }
		}

        stage('Run Test') {
            agent {
                docker {
                    image 'gauge-taiko'
                    label 'master'
                    // args '-v /tmp/gauge:/gauge --entrypoint=' //args '-u root --entrypoint=\'/bin/sh\''
                }
            }
            steps {

                unstash "gauge-taiko-source"

                echo 'Run test with gauge+taiko, generate and publish reports'

                script {

                    // Install taiko node modules
                    sh """
                    npm install
                    """

                    // Run 1st test
                    // docker run  --rm -it -v ${PWD}/reports:/gauge/reports gauge-taiko gauge run \
                    // --env getgauge,default specs/getgauge/
                    sh """
                    gauge run \
                    --env getgauge,default \
                    specs/getgauge/
                    """

                    // Run 2nd test
                    // docker run  --rm -it -v ${PWD}/reports:/gauge/reports gauge-taiko gauge run \
                    // --env the-internet.herokuapp.com,default specs/herokuapp/
                    sh """
                    gauge run \
                    --env the-internet.herokuapp.com,default \
                    specs/herokuapp/
                    """
                }
            }

			post {
                always {

                    sh """
                    tar -zcvf gauge-taiko-reports-${currentBuild.number}.tar.gz reports
                    """

                    archiveArtifacts artifacts: "**/*.tar.gz", fingerprint: true

                    publishHTML([allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: false,
                        reportDir: 'reports/html-report',
                        reportFiles: 'index.html',
                        reportName: 'HTML Report',
                        reportTitles: ''])

                    // clean up workspace except node_modules
                    sh 'find . -maxdepth 1 -not -name "node_modules" -not -name "." -not -name ".." -exec rm -rf {} +'
                    // cleanWs()
                }
            }
        }

    }

    post {
        always {
            cleanWs()
        }
    }
}
