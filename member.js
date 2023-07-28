function skillsMembers() {
    return {
        name: 'John Doe',
        age: 25,
        skills: ['HTML', 'CSS', 'JS'],
        showSkills() {
            const self = this
            this.skills.forEach(function(skill) {
                console.log(`${self.name} knows ${skill}`)
            })
        }
    }
}