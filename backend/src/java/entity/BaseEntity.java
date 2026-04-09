package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

//this is not emptity class this is super class of all the entities we created that's why we put @MappedSuperclass
@MappedSuperclass
public class BaseEntity implements Serializable{
    
    //set the time
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)    
    private Date createdAt;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at", updatable = false)
    private Date updatedAt;

    
    //when work in insert only
    @PrePersist
    public void onCreated(){
        
        createdAt = new Date();
        updatedAt = new Date();
        
    }
    
    
    //when work in update
    @PreUpdate
    public void onUpdate(){
                
        updatedAt = new Date();
        
    }
    
    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }            
    
}
